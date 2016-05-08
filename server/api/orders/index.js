'use strict';

var express = require('express'),
  controller = require('./orders.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.get_list);
router.get('/target/:id', controller.get_list_from_target);
router.get('/:id', controller.get);
router.post('/:id', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
