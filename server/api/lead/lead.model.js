'use strict';

import mongoose from 'mongoose';

var LeadSchema = new mongoose.Schema({
  email: String,
  message: String
});

export default mongoose.model('Lead', LeadSchema);
