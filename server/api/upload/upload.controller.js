'use strict';

var csvParse   = require('../../components/csv-parser');
var translate = require('../../components/translationMatrix');
var config     = require('../../config/environment');
var formidable = require('formidable');

var Patient = require('../patient/patient.model');

exports.create = function(req, res) {
  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    let file = files['file[lfFile]'];

    csvParse(file).then(function (csv){
      let data = translate(csv);
      let db = data.db;
      delete data.db;

      new Patient(null, {db: db, data: data}).save();
    });
  });
};
