'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
  cors = require('cors'),
  config = require('./config/environment'),
  pg = require('pg');

// Setup Database
pg.defaults.poolSize = config.pg.poolSize;

// Setup server
var request = require('./components/request');
var app = express();
app.use(cors());
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  pg.connect(config.conString, function (err, client, pgDone) {
    pgDone();
    if (err) return console.error(err);
    console.log('Successfully made first connection to database.');
  });
});

// Expose app
exports = module.exports = app;
