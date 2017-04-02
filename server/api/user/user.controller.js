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
  // console.log('params.id',req.params.id);
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
            company: account.customData.company,
            loopnet: account.customData.loopnet,
            linkedin: account.customData.linkedin,
            phone: (account.customData.privatePhone ? 'hidden' : account.customData.phone)
          }
        };
        // console.log(accountToReturn);
        respondWithResult(res,200)(accountToReturn);
      } else {
        res.status(500).end();
      }
  });
}

export function getEmail(user, callback) {
  var href = 'https://api.stormpath.com/v1/accounts/' + user;
  client.getAccount(href, function(err, account) {
      if (err) {
        console.log('error in getting user', err);
        callback('notfound');
      }
      if (account) {
        callback(account);
      } else {
        callback('notfound');
      }
  });
};


var validate = function(value,field){
  if (field==='loopnet'){
    // var regex = /http\:\/\/www\.loopnet\.com\/profile\/\d*\/[a-zA-Z-]*\/?/g;
    var regex = /[a-zA-Z-/]*\/?/g;
    var match = regex.exec(value);
    if (match){
      return match[0];
    } else {
      return '';
    }
  }
  if (field==='linkedin'){
    // var regex = /https\:\/\/www\.linkedin\.com\/[0-9a-zA-Z-\/]*\/?/g;
    var regex = /[a-zA-Z-/]*\/?/g;
    var match = regex.exec(value);
    if (match){
      return match[0];
    } else {
      return '';
    }
  }
  return value;
}

// Updates an existing User in the DB
export function update(req, res) {
  req.user.email =  req.body.email;
  req.user.username =  req.body.email;
  req.user.givenName =  req.body.givenName;
  req.user.surname =  req.body.surname;
  req.user.fullname = req.body.givenName + ' ' + req.body.surname;
  req.user.save(function (err) {
    if (err) {
      res.status(400).end(err.userMessage);
    } else {
      _.merge(req.user.customData, req.body.customData);
      req.user.customData.loopnet = validate(req.user.customData.loopnet, 'loopnet');
      req.user.customData.linkedin = validate(req.user.customData.loopnet, 'linkedin');
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


export function destroy(req, res){
  console.log('deleting account',req.user.href);
  //also need to delete the picture blob
  client.getAccount(req.user.href, function(err, account) {
      if (err) {
        console.log('error in getting user', err);
        res.status(500).send(err);
      }
      if (account) {
        account.delete(function(err){
          if (err){
            res.status(500).send(err);
          } else {
            res.status(200).end();
          }
        });
      } else {
        res.status(404).end();
      }
  });
}
