/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leads              ->  index
 * POST    /api/leads              ->  create
 * GET     /api/leads/:id          ->  show
 * PUT     /api/leads/:id          ->  update
 * DELETE  /api/leads/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Lead from './lead.model';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: process.env.CREAPP_MAILSERVICE,
  port: 465,
  secure: true, // use SSL
  auth: {
      user: process.env.CREAPP_MAILUSER,
      pass: process.env.CREAPP_MAILPASS
  }
});

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

// Gets a list of Leads
export function index(req, res) {
  return Lead.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Lead from the DB
export function show(req, res) {
  return Lead.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Lead in the DB
export function create(req, res) {
  var newLead = req.body;
  var mailOptions = {
    from: '"CREAapp notification" <notification@creapp.us>', // sender address
    to: "leads@creapp.us", // list of receivers
    subject: 'new lead', // Subject line
    text: 'A new lead submitted following information email: ' + newLead.email + ' message:' + newLead.message, // plaintext body
    html: '<p>A new lead submitted following information</p><p> email:' + newLead.email + '</p><p> message: "' + newLead.message + '</p>' // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('emailing error',error);
    }
    console.log('email sent to ',mailOptions.to,' info:',info);
  });
  return Lead.create(newLead)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Lead in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Lead.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Lead from the DB
export function destroy(req, res) {
  return Lead.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
