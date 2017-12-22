'use strict';

// Production specific configuration
// =================================
module.exports = {
    // MongoDB connection options
    mongo: {
      // uri: 'mongodb://localhost/nodemongo-dev',
      uri: 'mongodb://172.30.11.28:27018/nodemongo',
      options: {
          useMongoClient: true
      }
    },

    seedDB: true
  };
