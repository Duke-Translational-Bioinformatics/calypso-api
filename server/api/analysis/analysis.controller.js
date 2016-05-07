'use strict';
var Patient = require('./patient.model');
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

};

exports.histogram = function (req, res) {

};

exports.percentile = function (req, res) {

};

exports.predict = function (req, res) {

};
