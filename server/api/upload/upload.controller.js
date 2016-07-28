'use strict';

var csvParse   = require('../../components/csv-parser');
var config     = require('../../config/environment');
var formidable = require('formidable');

var Patient = require('../patient/patient.model');

exports.create = function(req, res) {
  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    let file = files['file[lfFile]'];

    csvParse(file).then(function (data){
      console.log(data);
    });
  });
};
