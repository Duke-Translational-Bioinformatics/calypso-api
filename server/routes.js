/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

  // Insert routes below
  // app.use('/api/users', require('./api/user')); TODO
  // app.use('/auth', require('./auth')); TODO
  app.use('/api/patients', require('./api/patient'));
  app.use('/api/analysis', require('./api/analysis'));
  app.use('/api/orders', require('./api/orders'));
  app.use('/api/targets', require('./api/targets'));

  // All other routes get a 404
  app.route('/*').get(errors[404]);
};
