'use strict';
var Analysis = require('./analysis.model');
var Patient = require('../patient/patient.model');
var _ = require('lodash');

var notFoundError = function (res) {
  return res.status(404).json('Not found.');
};

var badRequestError = function (res, err) {
  return res.status(400).json(err);
};

var internalError = function (res, err) {
  return res.status(500).json(err);
}

exports.get = function (req, res) {
  var patient
  if (req.params.id) patient = new Patient(req.params.id);
  if (req.query.values) patient = new Patient(null, req.query.values);
  Promise.all([Analysis.model_info(patient), Analysis.prediction(patient)]).then(function (values) {
    return res.status(200).json(values);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.histogram = function (req, res) {

};

exports.percentile = function (req, res) {

};

exports.info = function (req, res) {
  var patient
  if (req.params.id) patient = new Patient(req.params.id);
  if (req.query.values) patient = new Patient(null, req.query.values);
  Analysis.model_info(patient).then(function (info) {
    return res.status(200).json(info);
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.predict = function (req, res) {
  var patient
  if (req.params.id) patient = new Patient(req.params.id);
  if (req.query.values) patient = new Patient(null, req.query.values);
  Analysis.prediction(patient).then(function (prediction) {
    return res.status(200).json(prediction);
  }, function (err) {
    console.log(err);
    return badRequestError(res, err);
  });
};
