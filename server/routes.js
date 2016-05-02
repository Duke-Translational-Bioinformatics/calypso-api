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
  // app.use('/analytics', require('./api/analytics')); TODO
  // app.use('/targets', require('./api/targets')); TODO

  // All other routes get a 404
  app.route('/*').get(errors[404]);
};
