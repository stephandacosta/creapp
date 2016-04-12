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
  price: Number,
  sqft:Number,

  buy: Boolean,
  exchange: Boolean,

  polygons: [],
  centers: [],
  active: Boolean
});

export default mongoose.model('Buyreq', BuyreqSchema);
