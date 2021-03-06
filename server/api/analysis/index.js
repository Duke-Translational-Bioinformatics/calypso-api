'use strict';

var express = require('express'),
  controller = require('./analysis.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.get);
router.get('/predict/:id', controller.predict);
router.get('/info/:id', controller.info);
router.get('/histogram/:id', controller.histogram);
router.get('/percentile/:id', controller.percentile);

module.exports = router;
