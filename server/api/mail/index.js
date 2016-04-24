'use strict';

var express = require('express');
var controller = require('./mail.controller');
var ExpressStormpath = require('express-stormpath');
var router = express.Router();

router.get('/', ExpressStormpath.loginRequired, controller.index);
// router.get('/:id', controller.show);
router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
router.delete('/:id', ExpressStormpath.loginRequired, controller.destroy);

module.exports = router;
