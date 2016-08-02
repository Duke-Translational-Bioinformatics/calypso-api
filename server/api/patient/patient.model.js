'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');
var bookshelf = require('../../config/bookshelf');

query.connectionParameters = config.conString;

module.exports = class Patient {
  // Takes in an id OR values to not both.
  constructor(id, values) {
    if (!id && !values) throw new Error('Intialization error: Patient constructor requires params [id] or [values] to intialize.');
    this.id = id ? id : null;
    this.values = values ? values : null;
  }

  static query(search) {
    var patient = bookshelf.Model.extend({
      tableName: 'patient_variables',
      idAttribute: 'caseid'
    });

    return new Promise(function (resolve, reject) {
      patient.fetchAll().then(function (collection) {
        resolve(collection)
      }).catch(function (err){
        reject(err);
      });
    });
  }

  save(values) {
    var self = this;
    var patient = bookshelf.Model.extend({
      tableName: self.values.db,
      idAttribute: 'caseid'
    });

    patient.forge(self.values.data).save()
    .catch(function (err) {
      console.log(err);
    });

  }

  delete() {
    // if no id resolve with nothing but a warning
    console.log('TODO: Patient should be deleted from db.')
  }

  // returns patient predictors
  get predictors() {
    var self = this;
    var patient = bookshelf.Model.extend({
      tableName: 'patient_variables',
      idAttribute: 'caseid'
    });

    return new Promise(function (resolve, reject) {
      patient.forge({caseid: self.id}).fetch().then(function (variables) {
        if (variables) {
          resolve(variables);
        }
      }).catch(function (err) {
        if (err) {
          reject(err);
        }
      });
    });
  }

  // returns patient outcomes
  get outcomes() {
    var self = this;
    var patient = bookshelf.Model.extend({
      tableName: 'patient_outcomes_v2',
      idAttribute: 'caseid'
    });

    return new Promise(function (resolve, reject) {
      patient.forge({caseid: self.id}).fetch().then(function (outcomes) {
        if (outcomes) {
          resolve(outcomes);
        }
      }).catch(function (err) {
        if (err) {
          reject(err);
        }
      });
    });
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
