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

  static get_list_from_target(target_id) {
    return new Promise(function (resolve, reject) {
      query.first(
        `
	        SELECT array_agg(order_id) as orders
	        FROM order_to_intervention 
	        WHERE intervention_id = $1
	    `, [target_id],
        function (err, row, result) {
          if (err) return reject(err);
          Promise.all(Order.get_list(row.orders)).then(function (orders) {
            return resolve(orders);
          }, function (err) {
            return reject(err);
          });
        });
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
