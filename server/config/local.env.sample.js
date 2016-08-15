'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  PUBLIC_KEY_PATH: '/<your>/<path>/<to>/keys/key.pub.pem',
  PRIVATE_KEY_PATH: '/<your>/<path>/<to>/key.pem',
  POSTGRES_DEVELOPEMENT_URL: 'postgres://postgres@localhost:5432/calypso_dev?sslmode=disable',
  POSTGRES_PRODUCTION_URL: 'postgres://tech:<password>@calypso-db.c64rgxgts5ki.us-west-2.rds.amazonaws.com:5432/calypso',
  POSTGRES_TEST_URL: 'postgres://postgres@localhost:5432/calypso_test?sslmode=disable',
  DATABASE_POOL_SIZE: 25,
  BOX_TOKEN: '',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
