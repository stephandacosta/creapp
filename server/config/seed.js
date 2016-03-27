/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import BuyReq from '../api/buyreq/buyreq.model';
import buyReqSeed from '../config/seedObject';

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
    BuyReq.create(buyReqSeed);
  });
