'use strict';

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
  // TODO
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
