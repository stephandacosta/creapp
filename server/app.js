/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
var ExpressStormpath = require('express-stormpath');
var path = require('path');
var bodyParser = require('body-parser');

// this setting is a hack due to problems with mongo-connect
// https://github.com/kcbanner/connect-mongo/issues/214
require('bluebird').config( { warnings: { wForgottenReturn: false } } );

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
// stormpath init on server
app.use(ExpressStormpath.init(app,{
  website: true,
  postRegistrationHandler: function (account, req, res, next) {
    account.customData.privateEmail = true;
    account.customData.save(function (err) {
      if (err) { console.log('there was an error setting email to prvate:',err.userMessage);}
    });
    next();
  },
  web: {
    spaRoot: path.join(__dirname, '..','client','index.html'),
    me: {
      expand: {
        customData: true
      }
    },
    register: {
      form: {
        fields: {
          license: {
            enabled: true,
            label: 'RE license #',
            name: 'license',
            placeholder: 'XXXXX_XX',
            required: true,
            type: 'text'
          }
        }
      }
    }
  }
}));
app.use(bodyParser.urlencoded({ extended: true })); //ensure that your server-side framework is decoding complex form objects in POST bodies


var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// start server after  stormpath SDK is received
app.on('stormpath.ready',function() {
  // Start server
  setImmediate(startServer);
});



// Expose app
exports = module.exports = app;
