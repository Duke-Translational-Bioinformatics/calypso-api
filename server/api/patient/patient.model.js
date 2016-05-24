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
        resolve(self.values);
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
};
