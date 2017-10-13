'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/nodemongo-dev',
    options: {
        useMongoClient: true
    }
  },

  seedDB: true
};
