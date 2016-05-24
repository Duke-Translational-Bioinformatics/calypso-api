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
  var patient;
  if (req.params.id) patient = new Patient(req.params.id);
  if (req.query.values) patient = new Patient(null, req.query.values);
  if (!req.query.complication) return badRequestError(res, 'No complication given.');
  if (!req.query.bins) return badRequestError(res, 'Number of bins required.');
  Promise.all([Analysis.histogram(patient, req.query.complication, req.query.bins), Analysis.simple_stats(patient, req.query.complication)]).then(function (data) {
    return res.status(200).json({
      histogram: data[0],
      stats: data[1]
    });
  }, function (err) {
    return badRequestError(res, err);
  });
};

exports.percentile = function (req, res) {
  var patient
  if (req.params.id) patient = new Patient(req.params.id);
  if (req.query.values) patient = new Patient(null, req.query.values);
  Analysis.percentile(patient).then(function (percentileObj) {
    return res.status(200).json(percentileObj);
  }, function (err) {
    return badRequestError(res, err);
  });
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
    return badRequestError(res, err);
  });
};
