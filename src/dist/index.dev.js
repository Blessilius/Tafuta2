"use strict";

var express = require('express');

var path = require("path");

var bcrypt = require("bcrypt");

var multer = require('multer');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var collection = require("./config");

var app = express(); // Middleware for parsing JSON bodies

app.use(express.json()); // Middleware for parsing urlencoded bodies

app.use(express.urlencoded({
  extended: false
}));
app.set('view engine', 'ejs');
app.use(express["static"]("public"));
app.get("/", function (req, res) {
  res.render("login");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get("/admin", function (req, res) {
  res.render("admin");
});
app.get("/verification", function (req, res) {
  res.render("verification");
});
app.post("/signup", function _callee(req, res) {
  var data, existinguser, saltRounds, hashedPassword, userdata;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = {
            name: req.body.username,
            password: req.body.password,
            role: req.body.role
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(collection.findOne({
            name: data.name
          }));

        case 4:
          existinguser = _context.sent;

          if (!existinguser) {
            _context.next = 9;
            break;
          }

          res.send("User already exists. Please choose a different username.");
          _context.next = 19;
          break;

        case 9:
          saltRounds = 10;
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(data.password, saltRounds));

        case 12:
          hashedPassword = _context.sent;
          data.password = hashedPassword;
          _context.next = 16;
          return regeneratorRuntime.awrap(collection.insertMany(data));

        case 16:
          userdata = _context.sent;
          console.log(userdata);
          res.redirect("/login");

        case 19:
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).send("An error occurred during user registration.");

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 21]]);
});
app.post("/login", function _callee2(req, res) {
  var check, isPasswordMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(collection.findOne({
            name: req.body.username
          }));

        case 3:
          check = _context2.sent;

          if (check) {
            _context2.next = 8;
            break;
          }

          res.send("Username not found");
          _context2.next = 12;
          break;

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, check.password));

        case 10:
          isPasswordMatch = _context2.sent;

          if (isPasswordMatch) {
            res.render("home");
          } else {
            res.send("Wrong password");
          }

        case 12:
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send("An error occurred during login.");

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); // MongoDB Schema and Model for Vendor

var vendorSchema = new mongoose.Schema({
  businessName: String,
  description: String,
  location: String,
  businessHoursStart: String,
  businessHoursEnd: String,
  contact: String,
  socialMediaLink1: String,
  socialMediaLink2: String,
  businessCertificate: String,
  tin: String,
  businessPicture: String // Add a field for business picture

});
var Vendor = mongoose.model('Vendor', vendorSchema); // Set up multer for file uploads

var upload = multer({
  dest: 'uploads/'
}); // Route for handling form submission to save vendor data

app.post('/verification', upload.single('businessPicture'), function _callee3(req, res) {
  var formData, businessPicture, businessPictureData, newVendor;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Get form data
          formData = req.body; // Check if business picture file is uploaded

          if (req.file) {
            // Get business picture file data
            businessPicture = req.file; // Convert the file to base64 format (you might need additional processing here)

            businessPictureData = businessPicture.buffer.toString('base64'); // Add the business picture data to the form data

            formData.businessPicture = businessPictureData;
          } // Create a new Vendor instance with form data


          newVendor = new Vendor(formData); // Save the new vendor to the database

          _context3.next = 6;
          return regeneratorRuntime.awrap(newVendor.save());

        case 6:
          // Send success response
          res.status(200).send('Vendor data saved successfully.');
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          // Send error response
          console.error(_context3.t0);
          res.status(500).send('An error occurred while saving vendor data.');

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
var port = 8888;
app.listen(port, function () {
  console.log("Server running on Port: ".concat(port));
});
//# sourceMappingURL=index.dev.js.map
