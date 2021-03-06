/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');

module.exports = function (app) {
  var env = app.get('env');

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));

  app.set('views', config.root + 'server/views');
  app.set('view engine', 'pug');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  app.set('appPath', path.join(config.root, 'client'));

  if ('production' === env) {
    app.use(morgan('common'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler());
  }
};
