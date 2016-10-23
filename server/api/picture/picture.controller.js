/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pictures              ->  index
 * POST    /api/pictures              ->  create
 * GET     /api/pictures/:id          ->  show
 * PUT     /api/pictures/:id          ->  update
 * DELETE  /api/pictures/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Picture from './picture.model';
var azure = require('azure-storage');

var blobService = azure.createBlobService();


var getDate = function (minutes){
	var date = new Date();
	date.setMinutes((date).getMinutes() + minutes);
	return date;
};

export function signature(req, res){
  if (req.user){
    var userHref = req.user.href;
    var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
  }
  var url = blobService.generateSharedAccessSignature('brokerpics', userId, {
	AccessPolicy : {
		Permissions : "rwdl",
		Expiry : getDate(10)
	}});
	res.jsonp({url: url, userId: userId});
}

export function readsignature(req, res){
  if (req.user){
    var userHref = req.user.href;
    var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
  }
  var url = blobService.generateSharedAccessSignature('brokerpics', userId, {
	AccessPolicy : {
		Permissions : "r",
		Expiry : getDate(10)
	}});
	res.jsonp({url: url, userId: userId});
}
