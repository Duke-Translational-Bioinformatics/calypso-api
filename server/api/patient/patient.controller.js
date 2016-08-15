'use strict';
var Patient = require('./patient.model');
var _ = require('lodash');

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
  var patient = new Patient(req.params.id);
  patient.info.then(function (info) {
    if (_.isEmpty(info)) return notFoundError(res);
    return res.status(200).json(info);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.query = function (req, res) {
  // TODO
  Patient.query().then(function (patients) {
    res.status(200).json(patients);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.create = function (req, res) {
  // TODO
  return badRequestError(res, 'Create route incomplete');
};

exports.update = function (req, res) {
  // TODO
  return badRequestError(res, 'Update route incomplete');
};

exports.delete = function (req, res) {
  // TODO
  return badRequestError(res, 'Delete route incomplete');
};
