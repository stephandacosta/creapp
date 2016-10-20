'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BuyreqSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  // select false so will not be returned by database
  // user: {type: String, select: false},
  user: String,

  type: String,
  title: String,
  info: String,

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

  polygons: [],
  centers: [],

  town: String,
  city: String,
  country_code: String,
  county: String,
  postcode: String,
  road: String,
  state: String,

  active: Boolean
});

export default mongoose.model('Buyreq', BuyreqSchema);
