'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://localhost/nodemongo-dev',
    uri: 'mongodb://172.30.11.28:27018/nodemongo-dev',
    options: {
        useMongoClient: true
    }
  },

  seedDB: true
};
