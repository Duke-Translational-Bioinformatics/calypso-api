'use strict';

var _          = require('lodash');
var fs         = require('fs');
var xlsx       = require('xlsx');
var parse      = require('csv-parse');
var config     = require('../../config/environment');
var formidable = require('formidable');

var Analysis = require('../analysis/analysis.model');
var Patient = require('../patient/patient.model');
var Order = require('../orders/orders.model');
var Target = require('../targets/targets.model');

function parseCSV(file) {
  fs.createReadStream(file.path)
    .pipe(parse({delimiter: ','}, function(err, data) {
      console.log(data);
    }));
}

function parseXLSX(file) {
  var workbook = xlsx.readFile(file.path);
  console.log(workbook);
}

function getData(req) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    var file = files['file[lfFile]'];
    var extension = file.name.split('.').pop();

    if (extension === 'csv') {
      parseCSV(file);
    } else if (extension === 'xlsx') {
      parseXLSX(file);
    }
  });
}

exports.create = function(req, res) {
  getData(req);
};
