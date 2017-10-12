'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://172.30.11.28:60003/nodemongo-dev',
    options: {
        useMongoClient: true
    }
  },

  seedDB: true
};
