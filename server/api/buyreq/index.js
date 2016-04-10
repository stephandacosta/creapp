'use strict';

var express = require('express');
var controller = require('./buyreq.controller');
var ExpressStormpath = require('express-stormpath');
var router = express.Router();

router.get('/', controller.index);
router.get('/myreqs', ExpressStormpath.loginRequired, controller.index);
router.get('/:id', controller.show);
router.post('/', ExpressStormpath.loginRequired, controller.create);
router.put('/:id', ExpressStormpath.loginRequired, controller.update);
router.patch('/:id', ExpressStormpath.loginRequired, controller.update);
router.delete('/:id', ExpressStormpath.loginRequired, controller.destroy);


module.exports = router;
