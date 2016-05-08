'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');
var Order;

query.connectionParameters = config.conString;

module.exports = class Order {
  constructor() {}

  static get_list(id_array) {
    return id_array.map(function (id) {
      return Order.get(id);
    });
  }

  static get(id) {
    return new Promise(function (resolve, reject) {
      query.first(
        `
	        SELECT * 
	        FROM orders 
	        WHERE id = $1
	      `, [id],
        function (err, row, result) {
          if (err) return reject(err);
          return resolve(row);
        });
    });
  }
};
