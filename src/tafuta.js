
const mongoose = require('mongoose');
const connect2 = mongoose.connect("mongodb://localhost:27017/");




//check database connected or not
 connect2.then(() => {
      console.log("Tafuta database connected");



 })
 .catch(() => {
    console.log("Tafuta not connected")

})

/*
// Define Vendor schema
const VendorSchema = new mongoose.Schema({
    name: String,
    description: String,
    
    // Add more fields as needed
});
/*
const collection2 = new mongoose.model("Vendors",VendorSchema);
 module.exports = collection2;
 const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/KYC', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the vendor schema
const vendorSchema = new mongoose.Schema({
  vendorID: String,
  businessName: String,
  description: String,
  location: String,
  businessHoursStart: String,
  businessHoursEnd: String,
  contact: String,
  socialMediaLinks: [String],
  businessCertificate: String,
  tin: String
});



// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// Handle form submission
app.post('/verification', upload.single('businessCertificate'), async (req, res) => {
  try {
    const vendorData = req.body;
    vendorData.socialMediaLinks = [req.body.socialMediaLink1, req.body.socialMediaLink2];
    vendorData.businessCertificate = req.file.filename;

    const vendor = new Vendor(vendorData);
    await vendor.save();

    res.send('Vendor information submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting vendor information');
  }
});
const Vendor = mongoose.model('Vendor', vendorSchema);
 

 module.exports = Vendor;

*/




