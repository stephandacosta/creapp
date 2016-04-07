/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/buyreqs              ->  index
 * POST    /api/buyreqs              ->  create
 * GET     /api/buyreqs/:id          ->  show
 * PUT     /api/buyreqs/:id          ->  update
 * DELETE  /api/buyreqs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Buyreq from './buyreq.model';

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
    // need to tell mongoose that arrays changed
    // possibly create custom schema type to not need this http://mongoosejs.com/docs/customschematypes.html
    updated.markModified('centers');
    updated.markModified('polygons');
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
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

// Gets a list of Buyreqs
export function index(req, res) {
  // query from the initial request
  var query = req.query.query && JSON.parse(req.query.query);
  // for buyreq.edit need to return reqs from user
  if (req.query.own==='true'){
    var userHref = req.user.href;
    var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
    var userquery = { user: userId };
    query = { $and: [userquery, query]};
  }
  Buyreq.findAsync(query)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Buyreq from the DB
export function show(req, res) {
  Buyreq.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Buyreq in the DB
export function create(req, res) {
  var userHref = req.user.href;
  var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
  // this does not create new object, perhaps need for deepcopy
  var addition = req.body;
  addition.created = new Date;
  addition.active = true;
  addition.user = userId;
  Buyreq.createAsync(addition)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Buyreq in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Buyreq.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Buyreq from the DB
export function destroy(req, res) {
  Buyreq.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
