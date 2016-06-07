'use strict';

var Target = require('./targets.model');
var Patient = require('../patient/patient.model');

var notFoundError = function (res) {
  return res.status(404).json('Not found.');
}

var badRequestError = function (res, err) {
  return res.status(400).json(err);
}

var internalError = function (res, err) {
  return res.status(500).json(err);
}

exports.get_patient_targets = function (req, res) {
  var patient
  if (req.params.id) patient = new Patient(req.params.id);
  if (req.query.values) patient = new Patient(null, JSON.parse(req.query.values));
  Target.trigger(patient).then(function (targets) {
    return res.status(200).json(targets);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.get = function (req, res) {
  Target.get(req.params.id).then(function (target) {
    return res.status(200).json(target);
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
