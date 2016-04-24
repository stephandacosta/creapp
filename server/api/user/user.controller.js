/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';

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

// Gets user from the DB
export function show(req, res) {
  console.log('params.id',req.params.id);
  var href = 'https://api.stormpath.com/v1/accounts/' + req.params.id;
  client.getAccount(href, { expand: 'customData' }, function(err, account) {
      if (err) {
        console.log('error in getting user', err);
        res.status(err.status).send(err.userMessage);;
      }
      if (account) {
        // console.log('account',account);
        var accountToReturn = {
          userId: account.href.substr(account.href.lastIndexOf('/') + 1),
          // username: account.username,
          // email: (account.privateEmail?'':account.email),
          givenName: account.givenName,
          surname: account.surname,
          fullName: account.fullName,
          customData: {
            function: account.customData.function,
            license: account.customData.license,
            summary: account.customData.summary,
            loopnet: account.customData.loopnet,
            linkedin: account.customData.linkedin
          }
        };
        respondWithResult(res,200)(accountToReturn);
      } else {
        res.status(500).end();
      }
  });
}


// Updates an existing User in the DB
export function update(req, res) {
  req.user.givenName =  req.body.givenName;
  req.user.surname =  req.body.surname;
  req.user.fullname = req.body.givenName + ' ' + req.body.surname;
  req.user.save(function (err) {
    if (err) {
      res.status(400).end(err.userMessage);
    } else {
      _.merge(req.user.customData, req.body.customData);
      req.user.customData.save(function (err) {
        if (err) {
          res.status(400).end(err.userMessage);
        } else {
          res.status(200).json(req.user);
        }
      });
    }
  });
}
