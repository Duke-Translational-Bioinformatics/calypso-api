'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');
var PythonShell = require('python-shell');

query.connectionParameters = config.conString;

module.exports = class Analysis {
  constructor() {}

  static prediction(patient) {
    return new Promise(function (resolve, reject) {
      patient.predictors_to_array.then(function (predictors) {
        PythonShell.run('predict.py', {
          mode: 'json',
          args: [predictors],
          scriptPath: __dirname + '/machine_learning'
        }, function (err, results) {
          if (err) return reject(err);
          resolve(results[0]);
        });
      }, function (err) {
        reject(err);
      });
    });
  }

  static model_info(patient) {
    return new Promise(function (resolve, reject) {
      patient.predictors_to_array.then(function (predictors) {
        PythonShell.run('info.py', {
          mode: 'json',
          args: [predictors],
          scriptPath: __dirname + '/machine_learning'
        }, function (err, results) {
          if (err) return reject(err);
          return resolve(results[0]);
        });
      }, function (err) {
        return reject(err);
      });
    });
  }

  static histogram(patient) {
    console.log('Should get the histogram of a patient')
  }

  static percentile(patient) {
    console.log('Should get the percentile of a patient');
  }

};
