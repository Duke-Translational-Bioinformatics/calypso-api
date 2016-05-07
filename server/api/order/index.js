'use strict';

var express = require('express'),
  controller = require('./order.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.query);
router.get('/:id', controller.get);
router.post('/:id', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
