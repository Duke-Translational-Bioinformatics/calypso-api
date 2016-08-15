var request = require('request');
var config = require('../../config/environment');
var bookshelf = require('../../config/bookshelf');
var csvParse = require('../../components/csv-parser');
var Patient = require('../../api/patient/patient.model');
var translate = require('../../components/translationMatrix');
var BoxSDK = require('box-node-sdk');

var events = [
  'ITEM_UPLOAD',
  'ITEM_RENAME'
];

var sdk = new BoxSDK({
  clientID: config.boxClientID,
  clientSecret: config.boxClientSecret
});

var box = sdk.getBasicClient(config.boxToken);


var csv = bookshelf.Model.extend({
  tableName: 'csv'
});

var request = request.defaults({
  headers: {
    "Authorization": 'Bearer 6mko6mQQUCtMk1AyODM2h4fWLqUAafiY'
  }
});


var importCsv = function(file_version, action) {
  var options = {
    url: 'https://api.box.com/2.0/files/' + file_version + '/content'
  };

  var callback = function(err, response, body) {
    // Save Data to DB
    var saveCSV = function(){
      csvParse(body).then(function (csv){
        var data = translate(csv);
        var db = data.db;
        delete data.db;

        new Patient(null, {db: db, data: data}).save();
      });
    };

    if (action === 'update') {

      csv.forge({
        id: 1,
        file_version: file_version
      }).save()
      .then(function(){
        saveCSV();
        console.log('updated')
      });

    } else if (action === 'insert') {

      csv.forge({
        id: 1,
        file_version: file_version
      }).save(null, {method: 'insert'})
      .then(function(){
        saveCSV();
        console.log('inserted')
      });

    }

  };

  request(options, callback);
};

var trackFile = function(id) {
  var new_file_version = id;

  // Get csv count to see if new db
  csv.count().then(function(count) {
    // If not new db
    if (count > 0) {
      csv.forge({id: 1}).fetch().then(function(csv) {
        var old_file_version = csv.get('file_version');

        if (new_file_version !== old_file_version) {
          importCsv(new_file_version, 'update');
        }

      });

    // If fresh db
    } else {
      importCsv(new_file_version, 'insert');
    }

  });
};

var getFile = function(id) {
  box.files.get(id, null, function(err, data) {
    trackFile(data.id);
  });
};

box.events.getEventStream(function(err, stream) {
  if (err) {
    console.log(err);
  }

  stream.on('data', function(event) {
    var eventType = event.event_type;
    for (var i = 0; i < events.length; i++) {

      if (eventType === events[i]) {
        getFile(event.source.id);
      }

    }
  });
});
