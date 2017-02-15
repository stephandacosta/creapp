/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mails              ->  index
 * POST    /api/mails              ->  create
 * GET     /api/mails/:id          ->  show
 * PUT     /api/mails/:id          ->  update
 * DELETE  /api/mails/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Mail from './mail.model';


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
var path = require('path');
var templateDir = path.join(__dirname, 'templates', 'messageNotification');
var EmailTemplate = require('email-templates').EmailTemplate;



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

// Gets a list of Mails
export function index(req, res) {
  var userHref = req.user.href;
  var userId = userHref.substr(userHref.lastIndexOf('/') + 1);
  var userquery = { user: userId };
  return Mail.find(userquery).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Mail from the DB
export function show(req, res) {
  return Mail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Mail in the DB
// export function create(req, res) {
//   var addition = req.body;
//   addition.read = false;
//   console.log('addition',addition);
//   require('../user/user.controller').getEmail(addition.user, function(account){
//     var mailOptions = {
//         from: '"CREAapp notification" <notification@creapp.us>', // sender address
//         to: account.email, // list of receivers
//         subject: 'interest in your buy requirement', // Subject line
//         text: 'Dear ' + account.fullName + ', ' + addition.from_surname + ' ' + addition.from_givenName + '( ' + addition.from_email + ' ) is interested in your buyer requirement headlined "' + addition.buyreqTitle + '" this is his message: ' + addition.message, // plaintext body
//         html: '<p>Dear ' + account.fullName + ',</p><p>' + addition.from_surname + ' ' + addition.from_givenName + '( ' + addition.from_email + ' ) is interested in your buyer requirement</p><p> buyer requirement: "' + addition.buyreqTitle + '"</p><p> this is his message: </p><p>' + addition.message +'</p>' // html body
//     };
//     transporter.sendMail(mailOptions, function(error, info){
//       if(error){
//         console.log('emailing error',error);
//       }
//       console.log('email sent to ',mailOptions.to,' info:',info);
//     });
//   });
//   return Mail.create(addition)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }

function createMail(addition, res) {
  return function(prom) {
    console.log(prom);
    return Mail.create(addition)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
  };
}

export function create(req, res) {
  var addition = req.body;
  addition.read = false;
  console.log('addition',addition);
  require('../user/user.controller').getEmail(addition.user, function(account){
    var sendNotification = transporter.templateSender(new EmailTemplate(templateDir), {
      from: '"CREapp notification" <notification@creapp.us>'
    });
    return sendNotification({
      to: account.email,
      // EmailTemplate renders html and text but no subject so we need to
      // set it manually either here or in the defaults section of templateSender()
      subject: 'Interest in your requirement'
    },
    {
      brokerName: account.givenName,
      senderName: addition.from_givenName + ' ' + addition.from_surname,
      email: addition.from_email,
      message: addition.message
    })
    .then(createMail(addition,res))
    .catch(handleError(res));
  });
}


// Updates an existing Mail in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Mail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Mail from the DB
export function destroy(req, res) {
  return Mail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
