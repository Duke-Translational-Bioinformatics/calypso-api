'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');
var Analysis = require('../analysis/analysis.model');

query.connectionParameters = config.conString;

module.exports = class Target {
  constructor() {}

  static get(id) {
    return new Promise(function (resolve, reject) {
      query.first(
        `
          SELECT * 
          FROM interventions 
          WHERE id = $1
        `, [id],
        function (err, row, result) {
          if (err) return reject(err);
          return resolve(row);
        });
    });
  }

  // gets a list of triggered interventions given a patient. Gives back 
  // importance ordering for different complications.
  static trigger(patient) {
    return new Promise(function (resolve, reject) {
      query(
        `
          SELECT * 
          FROM interventions WHERE active=true
        `,
        function (err, rows, result) {
          if (err) return reject(err);

          Analysis.model_info(patient).then(function (model_info) {
            patient.info.then(function (info) {
              var self = info;
              rows = rows.filter(function (row) {
                /*jslint evil: true */
                if (eval(row.trigger)) return row;
              }).map(function (row) {
                delete row.trigger;
                return row;
              }).map(function (row) {
                var order = {};
                Object.keys(model_info).map(function (complication_key) {
                  order[complication_key] = model_info[complication_key][row.preop_variable];
                });
                row.order = order;
                return row;
              });

              return resolve(rows);
            }, function (err) {
              return reject(err);
            });
          }, function (err) {
            return reject(err);
          });
        });
    });
  }
};
