'use strict';

var config = require('./environment/');

var dbConfig = {
  client: 'pg',
  connection: config.conString
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
