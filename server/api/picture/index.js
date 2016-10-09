'use strict';

var express = require('express');
var controller = require('./picture.controller');
var ExpressStormpath = require('express-stormpath');
var router = express.Router();

router.get('/getsignature', ExpressStormpath.loginRequired, controller.signature);
router.get('/getreadsignature', controller.readsignature);

module.exports = router;
