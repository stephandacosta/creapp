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
      info: 'I am looking for something cheap but this test is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: true,
      landWithProperty: true,
      type: 'Agriculture',

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
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      priceMax: 1.4,

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
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      priceMax: 1.7,

      buy: true,
      lease: true,
      exchange: false,

      zipCodes: ['91032','4535','4534','43253','234325','123434','324234','42342'],
      polygon: [91.23, 45.34, 44.65],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      priceMax: 1.5,

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
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      priceMax: 1.5,

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
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      priceMax: 1.5,

      buy: true,
      lease: true,
      exchange: false,

      zipCodes: ['91032','4535','4534'],
      polygon: [91.23, 45.34, 44.65],
      active: true
    });

  });
