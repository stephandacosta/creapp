'use strict';

var express = require('express');
var controller = require('./user.controller');
var ExpressStormpath = require('express-stormpath');
var router = express.Router();

router.get('/:id', controller.show);
router.put('/', ExpressStormpath.loginRequired, controller.update);
router.delete('/', ExpressStormpath.loginRequired, controller.destroy);

module.exports = router;
