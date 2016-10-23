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

// use stormpath node sdk to query users from Stormpath API
var stormpath = require('stormpath');
var apiKey = new stormpath.ApiKey(
  process.env['STORMPATH_CLIENT_APIKEY_ID'],
  process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);
var client = new stormpath.Client({ apiKey: apiKey });


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
    _.remove(entity.centers);
    _.remove(entity.polygons);
    var updated = _.merge(entity, updates);
    // need to tell mongoose that arrays changed
    // possibly create custom schema type to not need this http://mongoosejs.com/docs/customschematypes.html
    updated.markModified('centers');
    updated.markModified('polygons');
    return updated.saveAsync()
      .then(updated => {
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


function checkUserInGroup(res, user, groupName){
  //http://stackoverflow.com/questions/31101983/getting-group-name-from-account-in-stormpath-express
  return function(entity){
    var isAdmin=false;
    return new Promise(function(resolve, reject){
      user.getGroups(function(err, groups) {
        if (err) {
          reject;
        }
        groups.items.forEach(function(group) {
          console.log('group.name', group.name, 'groupName', groupName);
          if (group.name === groupName){
            resolve(entity);
          }
        });
        reject;
      });
    });
  };
}

function checkUserRights(req, res) {
  return function(entity) {
    console.log(entity);
    var userHref = req.user.href;
    var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
    console.log('buyreq user:', entity.user, 'requesting user:', userId);
    if (entity.user !== userId ) {
      checkUserInGroup(res, req.user, 'admins')(entity);
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
  // for buyreqs/myreqs need to return reqs from user
  if (req.user){
    var userHref = req.user.href;
    var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
    var userquery = { user: userId };
    query = { $and: [userquery, query]};
  }
  // for buyreqs/brokerreqs need to return reqs from broker
  if (req.params.brokerid){
    var userquery = { user: req.params.brokerid };
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

// Gets user of single Buyreq from the DB
export function getUser(req, res) {
  console.log('params.id',req.params.id);
  var href = 'https://api.stormpath.com/v1/accounts/' + req.params.id;
  client.getAccount(href, function(err, account) {
      if (err) {
        console.log('error in getting user', err);
        res.status(500).send(err);;
      }
      if (account) {
        var accountToReturn = {
          username: account.username,
          // email: (account.privateEmail?'':account.email),
          givenName: account.givenName,
          surname: account.surname,
          fullName: account.fullName,
          function: account.function,
          license: account.license,
          summary: account.summary
        };
        respondWithResult(res,200)(accountToReturn);
      } else {
        res.status(404).end();
      }
  });
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
    .then(checkUserRights(req, res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function adminUpdate(req, res) {
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
