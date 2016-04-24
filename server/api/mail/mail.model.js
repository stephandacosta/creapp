'use strict';

import mongoose from 'mongoose';

var MailSchema = new mongoose.Schema({
  from_email: String,
  from_givenName: String,
  from_surname: String,
  user: String, //receiver id
  message: String,
  read: Boolean
});

export default mongoose.model('Mail', MailSchema);
