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
          AllowedMethods: ['GET', 'PUT', 'OPTIONS'],
          AllowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-ms-blob-type'],
          ExposedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-ms-blob-type'],
          MaxAgeInSeconds: 500
        }
        // {
        //   AllowedOrigins: ['www.msdn.com', 'www.asp.com'],
        //   AllowedMethods: ['GET', 'PUT'],
        //   AllowedHeaders: ['x-ms-meta-data*', 'x-ms-meta-target*', 'x-ms-meta-xyz', 'x-ms-meta-foo'],
        //   ExposedHeaders: ['x-ms-meta-data*', 'x-ms-meta-source*', 'x-ms-meta-abc', 'x-ms-meta-bcd'],
        //   MaxAgeInSeconds: 500,
        // },
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


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Pictures
export function index(req, res) {
  uploadFile(res);
  // return Picture.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

var getDate = function (){
	var date = new Date();
	date.setHours((date).getHours() + 1);
	return date;
};

export function signature(req, res){
  var url = blobService.generateSharedAccessSignature('brokerpics', 'testblobpic2', {
	AccessPolicy : {
		Permissions : "rwdl",
		Expiry : getDate()
	}});
	res.jsonp({url: url});
}

// Gets a single Picture from the DB
export function show(req, res) {
  return Picture.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Picture in the DB
export function create(req, res) {


  return Picture.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Picture in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Picture.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Picture from the DB
export function destroy(req, res) {
  return Picture.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
