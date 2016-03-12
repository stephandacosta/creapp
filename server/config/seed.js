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
      name: 'Buyers',
      info: 'Publish your requirements and find new contacts'
    }, {
      name: 'Sellers',
      info: 'Search requirements from qualified buyer.'
    });
  });

BuyReq.find({}).removeAsync()
  .then(() => {
    BuyReq.create({
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'somedude@somemail.com',
      title: 'a piece of land in the fields',
      info: 'I am looking for something cheap',

      landOnly: true,
      landWithProperty: true,
      type: 'Agriculture',

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
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'in a cool place',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

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
