'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');

query.connectionParameters = config.conString;

module.exports = class Patient {
  // Takes in an id OR values to not both.
  constructor(id, values) {
    if (!id && !values) throw new Error('Intialization error: Patient constructor requires params [id] or [values] to intialize.');
    this.id = id ? id : null;
    this.values = values ? values : null;
  }

  static query(search) {
    // should query patients
    console.log('TODO: Should return a list of patients that match the search.');
  }

  save(values) {
    // If there is an id, update the patient in the db
    // If there is no id, save a new patient in the db 
    console.log('TODO: Patient should be saved into db.');
  }

  delete() {
    // if no id resolve with nothing but a warning
    console.log('TODO: Patient should be deleted from db.')
  }

  // returns patient predictors
  get predictors() {
    var self = this;
    if (self.id) {
      return new Promise(function (resolve, reject) {
        query.first(
          `
            SELECT * 
            FROM patient_variables 
            WHERE caseid = $1
          `, [self.id],
          function (err, row, result) {
            if (err) return reject(err);
            resolve(row);
          });
      });
    }

    if (self.values) {
      return new Promise(function (resolve, reject) {
        reject('TODO: Should return predictors.');
      });
    }
  }

  // returns patient outcomes
  get outcomes() {
    var self = this;
    if (self.id) {
      return new Promise(function (resolve, reject) {
        query.first(
          `
            SELECT * 
            FROM patient_outcomes_v2 
            WHERE caseid = $1
          `, [self.id],
          function (err, row, result) {
            if (err) return reject(err);
            resolve(row);
          });
      });
    }
    if (self.values) {
      return new Promise(function (resolve, reject) {
        reject('TODO: Should return outcomes.');
      });
    }
  }

  // returns patient predictors and outcomes
  get info() {
    var self = this;
    if (self.id) {
      return new Promise(function (resolve, reject) {
        Promise.all([self.predictors, self.outcomes]).then(function (values) {
          return resolve(_.merge(values[0], values[1]));
        }, function (err) {
          return reject(err);
        });
      });
    }
    if (self.values) {
      return new Promise(function (resolve, reject) {
        reject('TODO: Should return info.');
      });
    }
  }

  // turns patient predictors into an array.
  get predictors_to_array() {
    var self = this;
    if (self.id) {
      return new Promise(function (resolve, reject) {
        query.first(
          `
            SELECT transform(row_to_json(patient_obj)) as data
            FROM 
              (
                SELECT * 
                FROM patient_variables 
                WHERE caseid=$1
              ) as patient_obj
          `, [self.id],
          function (err, row, result) {
            if (err) return reject(err);
            resolve(row.data);
          });
      });
    }

    if (self.values) {
      return new Promise(function (resolve, reject) {
        query.first(
          `
            SELECT transform($1::json) as data
          `, [self.values],
          function (err, row, result) {
            if (err) return reject(err);
            resolve(row.data);
          });
      });
    }
  }

  static predictor_array_mapping(index) {
    if (index >= 0 || index <= 3) return 'year';
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
    if (index >= 24 || index <= 26) return 'race';
    if (index === 27) return 'bmi';
    if (index >= 28 || index <= 31) return 'asa';
    if (index >= 32 || index <= 33) return 'diabetes';
    if (index >= 34 || index <= 35) return 'dyspnea';
    if (index >= 36 || index <= 37) return 'fnstatus';
    if (index === 38) return 'liver';
    if (index === 39) return 'heart';
    if (index === 40) return 'pvd';
    if (index === 41) return 'neuro';
    if (index === 42) return 'plegia';
    if (index === 43) return 'chemo_radio';
    if (index >= 44 || index <= 46) return 'infx';
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
    if (index >= 59 || index <= 60) return 'podiag';
    if (index === 61) return 'workrvu';
    if (index === 62) return 'pgy';
    if (index === 63) return 'emergency';
    if (index === 64) return 'optime';
    if (index === 65) return 'cpt_mis';
    if (index === 66) return 'cpt_implant';
    if (index === 67) return 'general_anes';
    if (index === 68) return 'other_proc';
    if (index === 69) return 'concurrent_proc';
    if (index >= 70 || index <= 72) return 'wound';
    if (index >= 73 || index <= 86) return 'cpt_type';
    if (index >= 87 || index <= 282) return 'ccs_category';
  }
};
