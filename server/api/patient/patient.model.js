'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');

query.connectionParameters = config.conString;

module.exports = class Patient {
  constructor(id) {
    this.id = id;
  }

  get predictors() {
    var self = this;
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

  get outcomes() {
    var self = this;
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

  get info() {
    var self = this;
    return new Promise(function (resolve, reject) {
      Promise.all([self.predictors, self.outcomes]).then(function (values) {
        return resolve(_.merge(values[0], values[1]));
      }, function (err) {
        return reject(err);
      });
    });
  }
};
