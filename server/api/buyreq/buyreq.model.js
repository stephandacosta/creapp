'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BuyreqSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
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

  zipCodes: [String],
  polygon: [],
  active: Boolean
});

export default mongoose.model('Buyreq', BuyreqSchema);
