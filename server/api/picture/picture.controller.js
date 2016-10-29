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
var path = require('path');
var azure = require('azure-storage');

var blobService = azure.createBlobService();

// does not work creates [TypeError: this._createBlobFromLocalFile is not a function]
// var appendBlobFromLocalFile = require('bluebird').promisify(blobService.createBlockBlobFromLocalFile);
var defaultPicturePath = path.join(__dirname,'user-default.png');


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

export function resetPicture (req, res){
	var userHref = req.user.href;
	var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
	blobService.createBlockBlobFromLocalFile('brokerpics', userId, defaultPicturePath,function(error, result){
		if(error){
			console.log(error);
			res.status(500).send(error);
		} else {
			console.log('default picture is uploaded for userId', userId);
			res.status(200).end();
		}
	});
}


export function addDefaultPicture(userId){
  // upload blob from server
  console.log('uploading default picture server side');
	blobService.createBlockBlobFromLocalFile('brokerpics', userId, defaultPicturePath,function(error, result){
		if(error){
			console.log(error);
		} else {
			console.log('default picture is uploaded for userId', userId);
		}
	});
}
