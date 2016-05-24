'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');
var PythonShell = require('python-shell');
var Analysis;

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
          var variable_importance = {};
          Object.keys(results[0].info).map(function (complication) {
            var complication_object = variable_importance[complication] = {};
            results[0].info[complication].map(function (value, index) {
              var predictor = Analysis.predictor_array_mapping(index);
              if (!complication_object[predictor]) complication_object[predictor] = 0;
              complication_object[predictor] += Math.abs(value);
            });
          });
          return resolve(variable_importance);
        });
      }, function (err) {
        return reject(err);
      });
    });
  }

  static histogram(patient) {
    console.log('Should get the histogram of a patient')
  }

  static getListOfModels() {
    return [
      'cardiac_complications',
      'morbidity',
      'mortality',
      'neurologic_complications',
      'renal_complications',
      'reoperations',
      'respiratory_complications',
      'systemic_septic_complications',
      'wound_compilcations',
      'urinary_tract_infections',
      'thrombeombolic_complications'
    ]
  }

  static getCount(complication, prediction_value, cpt) {
    return new Promise(function (resolve, reject) {
      query.first(
        `
          SELECT count(caseid) 
          FROM patient_predictions NATURAL JOIN patient_variables
          WHERE ` + complication + ` <= $1
          AND cpt = $2
        `, [prediction_value, cpt],
        function (err, row, result) {
          if (err) return reject(err);
          resolve(row.count);
        });
    });
  }

  static getTotal(cpt) {
    return new Promise(function (resolve, reject) {
      query.first(
        `
          SELECT count(caseid) 
          FROM patient_predictions NATURAL JOIN patient_variables
          WHERE cpt = $1
        `, [cpt],
        function (err, row, result) {
          if (err) return reject(err);
          resolve(row.count);
        });
    });
  }

  static percentile(patient) {
    var self = this;
    var cpt, total;
    var percentileObj = {
      percentile: {},
      size: 0,
      cpt: ''
    };

    var total_promise = new Promise(function (resolve, reject) {
      patient.info.then(function (info) {
        cpt = info.cpt;
        return self.getTotal(info.cpt);
      }, function (err) {
        return reject(err);
      }).then(function (t) {
        total = t;
        resolve({
          cpt: cpt,
          total: total
        });
      }, function (err) {
        return reject(err);
      });
    });

    return new Promise(function (resolve, reject) {
      Promise.all([total_promise, self.prediction(patient)]).then(function (data) {
        Promise.all(self.getListOfModels().map(function (model) {
          return self.getCount(model, data[1].predict[model], data[0].cpt);
        })).then(function (countArray) {
          self.getListOfModels().map(function (model, index) {
            percentileObj.percentile[model] = (countArray[index] / total) * 100
          });
          percentileObj.size = parseInt(total);
          percentileObj.cpt = data[0].cpt;
          resolve(percentileObj);
        }, function (err) {
          reject(err);
        });
      }, function (err) {
        reject(err);
      });
    });
  }

  static predictor_array_mapping(index) {
    if (index >= 0 && index <= 3) return 'year';
    if (index === 4) return 'sex';
    if (index === 5) return 'age';
    if (index === 6) return 'smoker';
    if (index === 7) return 'alcohol';
    if (index === 8) return 'dnr';
    if (index === 9) return 'ventilat';
    if (index === 10) return 'hxcopd';
    if (index === 11) return 'cpneumon';
    if (index === 12) return 'hxchf';
    if (index === 13) return 'cardiac_surgery';
    if (index === 14) return 'renalfail';
    if (index === 15) return 'dialysis';
    if (index === 16) return 'discancr';
    if (index === 17) return 'preop_wndinf';
    if (index === 18) return 'steroid_immunosup';
    if (index === 19) return 'wtloss';
    if (index === 20) return 'bleeddis';
    if (index === 21) return 'preop_transfus';
    if (index === 22) return 'pregnancy';
    if (index === 23) return 'priorop';
    if (index >= 24 && index <= 26) return 'race';
    if (index === 27) return 'bmi';
    if (index >= 28 && index <= 31) return 'asa';
    if (index >= 32 && index <= 33) return 'diabetes';
    if (index >= 34 && index <= 35) return 'dyspnea';
    if (index >= 36 && index <= 37) return 'fnstatus';
    if (index === 38) return 'liver';
    if (index === 39) return 'heart';
    if (index === 40) return 'pvd';
    if (index === 41) return 'neuro';
    if (index === 42) return 'plegia';
    if (index === 43) return 'chemo_radio';
    if (index >= 44 && index <= 46) return 'infx';
    if (index === 47) return 'lab_sodium';
    if (index === 48) return 'lab_bun';
    if (index === 49) return 'lab_creatine';
    if (index === 50) return 'lab_albumin';
    if (index === 51) return 'lab_bili';
    if (index === 52) return 'lab_ast';
    if (index === 53) return 'lab_alkphos';
    if (index === 54) return 'lab_wbc';
    if (index === 55) return 'lab_hct';
    if (index === 56) return 'lab_plt';
    if (index === 57) return 'lab_ptt';
    if (index === 58) return 'lab_inr';
    if (index >= 59 && index <= 60) return 'podiag';
    if (index === 61) return 'workrvu';
    if (index === 62) return 'pgy';
    if (index === 63) return 'emergency';
    if (index === 64) return 'optime';
    if (index === 65) return 'cpt_mis';
    if (index === 66) return 'cpt_implant';
    if (index === 67) return 'general_anes';
    if (index === 68) return 'other_proc';
    if (index === 69) return 'concurrent_proc';
    if (index >= 70 && index <= 72) return 'wound';
    if (index >= 73 && index <= 86) return 'cpt_type';
    if (index >= 87 && index <= 282) return 'ccs_category';
  }

};
