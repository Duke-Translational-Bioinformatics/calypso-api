'use strict';

// Development specific configuration
// ==================================
module.exports = {
  seedDB: true,
  conString: process.env.POSTGRES_DEVELOPEMENT_URL,
  boxToken: process.env.BOX_DEVELOPMENT_TOKEN
};
