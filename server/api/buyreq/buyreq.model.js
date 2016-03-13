'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BuyreqSchema = new mongoose.Schema({
  // _reqId: Types.ObjectId,
  // created: { type: Date, default: Date.now },
  user: String,
  title: String,
  info: String,

  landOnly: Boolean,
  landWithProperty: Boolean,
  type: String,
  priceMax: Number,

  buy: Boolean,
  lease: Boolean,
  exchange: Boolean,

  zipCodes: [],
  polygon: [Number],
  active: Boolean
});

export default mongoose.model('Buyreq', BuyreqSchema);
