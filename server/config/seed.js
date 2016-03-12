/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import BuyReq from '../api/buyreq/buyreq.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

BuyReq.find({}).removeAsync()
  .then(() => {
    BuyReq.create({
      // _reqId: new mongoose.Types.ObjectId,
      // created: new Date,
      user: 'somedude@somemail.com',
      title: 'a piece of land in the fields',
      info: 'I am looking for something cheap',

      landOnly: true,
      landWithProperty: true,
      Leisure: false,
      Retail: true,
      Office: false,
      Industrial: false,
      Multifamily: false,
      priceMin: 1.2,
      priceMax: 2.4,

      buy: true,
      lease: true,
      exchange: false,

      zipCodes: ['91032','4535','4534'],
      polygon: [91.23, 45.34, 44.65],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      // created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'in a cool place',

      landOnly: false,
      landWithProperty: true,
      Leisure: true,
      Retail: false,
      Office: false,
      Industrial: false,
      Multifamily: false,
      priceMin: 1.2,
      priceMax: 2.4,

      buy: true,
      lease: true,
      exchange: false,

      zipCodes: ['91032','4535','4534'],
      polygon: [91.23, 45.34, 44.65],
      active: true
    });

  });
