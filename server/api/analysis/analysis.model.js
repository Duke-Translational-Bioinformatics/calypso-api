'use strict';
var pg = require('pg');
var query = require('pg-query');
var _ = require('lodash');
var validator = require('validator');
var config = require('../../config/environment');

query.connectionParameters = config.conString;

module.exports = class Analysis {
  constructor() {

  }

  static model_info() {

  }

  static prediction(patient) {
    console.log('Should predict a patient')
  }

  static histogram(patient) {
    console.log('Should get the histogram of a patient')
  }

  static percentile(patient) {
    console.log('Should get precentile')
  }
};
