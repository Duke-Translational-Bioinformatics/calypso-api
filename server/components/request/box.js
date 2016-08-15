var request = require('request');
var bookshelf = require('../../config/bookshelf');
var csvParse = require('../../components/csv-parser');
var Patient = require('../../api/patient/patient.model');
var translate = require('../../components/translationMatrix');
var CronJob = require('cron').CronJob;

var csv = bookshelf.Model.extend({
  tableName: 'csv'
});

var request = request.defaults({
  headers: {
    "Authorization": 'Bearer ' + process.env.BOX_TOKEN
  }
})

var importCsv = function(id, file_version) {
  var options = {
    url: 'https://api.box.com/2.0/files/' + id + '/content'
  };

  var callback = function(err, response, body) {
    // Save Data to DB
    csvParse(body).then(function (csv){
      var data = translate(csv);
      var db = data.db;
      delete data.db;

      new Patient(null, {db: db, data: data}).save();
    });

    // Save file version
    csv.forge({
      id: 1,
      file_version: file_version
    }).save(null, {method: 'insert'})
    .then(function (csv){
      console.log('Imported new CSV');
    })
    .catch(function (err) {
      console.log(err);
    });

  };

  request(options, callback);
};

var trackFile = function(id) {
  var options = {
    url: 'https://api.box.com/2.0/files/' + id
  };

  var callback = function(err, response, body) {
    body = JSON.parse(body);
    var new_file_version = body.file_version.id;

    // Get csv count to see if new db
    csv.count().then(function(count) {
      // If not new db
      if (count > 0) {
        csv.forge({id: 1}).fetch().then(function(csv) {
          var old_file_version = csv.get('file_version');

          if (new_file_version !== old_file_version) {
            importCsv(id, new_file_version);
          }

        });

      // If fresh db
      } else {
        importCsv(id, new_file_version);
      }

    });
  }

  request(options, callback);
};

var getBoxEntries = function() {
  var options = {
    url: 'https://api.box.com/2.0/folders/9107199641'
  };

  var callback = function(err, response, body) {
    var parsedBody = JSON.parse(body);
    var entries = parsedBody.item_collection.entries;

    for (var i = 0; i < entries.length; i++) {
      var fileId = entries[i].id;
      trackFile(fileId);
    }
  };

  request(options, callback);
};


// Set 1 minute interval 
new CronJob('0 * * * * *', function() {
  getBoxEntries();
}, null, true, 'America/Los_Angeles');
