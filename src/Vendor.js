const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    businessName: String,
    description: String,
    location: String,
    socialMediaLink1: String,
    socialMediaLink2: String
});

module.exports = mongoose.model('Vendor', vendorSchema);
