'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');

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

  static trigger(patient) {
    return new Promise(function (resolve, reject) {
      query(
        `
          SELECT * 
          FROM interventions WHERE active=true
        `,
        function (err, rows, result) {
          if (err) return reject(err);

          patient.info.then(function (info) {
            var self = info;
            rows = rows.filter(function (row) {
              /*jslint evil: true */
              if (eval(row.trigger)) return row;
            }).map(function (row) {
              delete row.trigger;
              return row;
            });

            return resolve(rows);
          }, function (err) {
            return reject(err);
          });
        });
    });
  }
};
