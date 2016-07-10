/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
var ExpressStormpath = require('express-stormpath');


export default function(app) {
  // Insert routes below
  app.use('/api/leads', require('./api/lead'));
  app.use('/api/mails', require('./api/mail'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/buyreqs', require('./api/buyreq'));
  // includes condition stormpath user login validation to protect endpoint
  app.use('/api/things', ExpressStormpath.loginRequired, require('./api/thing'));

  // this would return the groups, seems to have a big in stormpath sdk
  // app.use('/groups', ExpressStormpath.loginRequired, function (req, res) {
  //   res.json(req.user.groups);
  // });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
