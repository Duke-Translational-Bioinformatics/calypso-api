'use strict';

var Order = require('./orders.model');

var notFoundError = function (res) {
  return res.status(404).json('Not found.');
}

var badRequestError = function (res, err) {
  return res.status(400).json(err);
}

var internalError = function (res, err) {
  return res.status(500).json(err);
}

exports.get = function (req, res) {
  Order.get(req.params.id).then(function (order) {
    return res.status(200).json(order);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.get_list = function (req, res) {
  Promise.all(Order.get_list(req.query.id_array)).then(function (orders) {
    return res.status(200).json(orders);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.query = function (req, res) {
  // TODO
};

exports.create = function (req, res) {
  // TODO
};

exports.update = function (req, res) {
  // TODO
};

exports.delete = function (req, res) {
  // TODO
};