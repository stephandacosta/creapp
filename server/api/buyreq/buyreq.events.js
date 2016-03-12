/**
 * Buyreq model events
 */

'use strict';

import {EventEmitter} from 'events';
var Buyreq = require('./buyreq.model');
var BuyreqEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BuyreqEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Buyreq.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BuyreqEvents.emit(event + ':' + doc._id, doc);
    BuyreqEvents.emit(event, doc);
  }
}

export default BuyreqEvents;
