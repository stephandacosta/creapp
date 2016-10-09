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

var serviceProperties = generateServiceProperties();

blobService.getServiceProperties(function(error, result, response) {
  if (!error) {
    console.log(result.Cors.CorsRule);
    blobService.setServiceProperties(serviceProperties, function(error, result, response) {
      if (!error) {
        // properties are set
        console.log(result);
      }
    });
  }
});

//http://azure.github.io/azure-storage-node/#toc0
function generateServiceProperties() {
  return serviceProperties = {
    Cors: {
      CorsRule: [
        {
          AllowedOrigins: ['http://www.creapp.us', 'http://localhost:9000'],
          AllowedMethods: ['GET', 'PUT', 'HEADER', 'OPTIONS', 'DELETE'],
          AllowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-ms-blob-type', 'x-ms-delete-snapshots'],
          ExposedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-ms-blob-type', 'x-ms-delete-snapshots'],
          MaxAgeInSeconds: 120
        }
      ]
    }
  };
}

// var blobSvc = azure.createBlobService();
//
// var uploadFile = function(req, res){
//   console.log('uploading server side');
//   blobSvc.createAppendBlobFromLocalFile('brokerpics', 'testblobpic', require('path').dirname(require.main.filename) + '/test.png', function(error, result, response){
//     if(error){
//       console.log(error);
//     }
//     if(!error){
//       console.log('test is uploaded');
//       res.status(200).json(result);
//     }
//   });
// };


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
