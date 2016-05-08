'use strict';

var express = require('express'),
  controller = require('./targets.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.get);
router.get('/patient/:id', controller.get_patient_targets);
router.post('/', controller.create);

module.exports = router;
