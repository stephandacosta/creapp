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
