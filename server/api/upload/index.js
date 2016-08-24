'use strict';

var express = require('express');
var controller = require('./upload.controller.js');

var router = express.Router();

router.post('/', controller.create);

module.exports = router;
