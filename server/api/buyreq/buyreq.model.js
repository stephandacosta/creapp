'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BuyreqSchema = new mongoose.Schema({
  // also need to adapt constants and empty req
  created: { type: Date, default: Date.now },
  // select false so will not be returned by database
  // user: {type: String, select: false},
  user: String,

  type: {type: String, enum:['Any','Retail','Office','Leisure','Multifamily','Hotel','Senior Housing','Industrial','Health Care','Land','Agricultural', 'Other']},
  title: { type: String, maxlength: 36 },
  info: { type: String, maxlength: 500 },

  landOnly: Boolean,
  landWithProperty: Boolean,

  buy: Boolean,
  buy_min_price: Number,
  buy_max_price: Number,

  lease: Boolean,
  lease_min_price: Number,
  lease_max_price: Number,

  exchange: Boolean,
  exchange_min_price: Number,
  exchange_max_price: Number,

  min_sqft: Number,
  max_sqft: Number,

  polygon: [],
  center: [],
  radius: Number,

  town: String,
  city: String,
  country_code: String,
  county: String,
  postcode: String,
  road: String,
  state: { type: String, enum:['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']},

  active: Boolean
});

export default mongoose.model('Buyreq', BuyreqSchema);
