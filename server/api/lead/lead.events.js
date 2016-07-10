/**
 * Lead model events
 */

'use strict';

import {EventEmitter} from 'events';
var Lead = require('./lead.model');
var LeadEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LeadEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Lead.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LeadEvents.emit(event + ':' + doc._id, doc);
    LeadEvents.emit(event, doc);
  }
}

export default LeadEvents;
