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

  min_price: Number,
  max_price: Number,

  min_sqft: Number,
  max_sqft: Number,

  buy: Boolean,
  exchange: Boolean,
  lease: Boolean,

  polygons: [],
  centers: [],
  active: Boolean
});

export default mongoose.model('Buyreq', BuyreqSchema);
