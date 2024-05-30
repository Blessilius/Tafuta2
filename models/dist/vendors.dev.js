"use strict";

var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
  businessName: String,
  description: String,
  location: String,
  socialMediaLink1: String,
  socialMediaLink2: String
});
module.exports = mongoose.model('Vendor', vendorSchema);
//# sourceMappingURL=vendors.dev.js.map
