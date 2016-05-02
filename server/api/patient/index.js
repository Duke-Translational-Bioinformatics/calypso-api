'use strict';

var express = require('express'),
  controller = require('./patient.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.get);
router.post('/', controller.create);

module.exports = router;
