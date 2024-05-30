const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const collection = require("./config");
const Vendor = require("./Vendor"); // Import your Vendor model
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing urlencoded bodies
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/admin", (req, res) => {
    res.render("admin");
});

app.get("/home", (req, res) => {
  res.render("home");
});


app.get("/verification", (req, res) => {
    res.render("verification");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        role: req.body.role
    }

    try {
        const existinguser = await collection.findOne({ name: data.name });
        if (existinguser) {
            res.send("User already exists. Please choose a different username.");
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;
            const userdata = await collection.insertMany(data);
            console.log(userdata);
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during user registration.");
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username not found");
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (isPasswordMatch) {
                res.render("home");
            } else {
                res.send("Wrong password");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during login.");
    }
});

// MongoDB Schema and Model for Vendor
const vendorSchema = new mongoose.Schema({
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

// const Vendor = mongoose.model('Vendor', vendorSchema);

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for handling form submission to save vendor data
app.post('/verification', upload.single('businessPicture'), async (req, res) => {
    try {
        // Get form data
        const formData = req.body;

        // Check if business picture file is uploaded
        if (req.file) {
            // Get business picture file data
            const businessPicture = req.file;

            // Convert the file to base64 format (you might need additional processing here)
            const businessPictureData = businessPicture.buffer.toString('base64');

            // Add the business picture data to the form data
            formData.businessPicture = businessPictureData;
        }

        // Create a new Vendor instance with form data
        const newVendor = new Vendor(formData);

        // Save the new vendor to the database
        await newVendor.save();

        // Send success response
        res.status(200).send('Vendor data saved successfully.');
    } catch (error) {
        // Send error response
        console.error(error);
        res.status(500).send('An error occurred while saving vendor data.');
    }
});

// Route for fetching submitted vendors
app.get('/submitted-vendors', async (req, res) => {
    try {
        const submittedVendors = await Vendor.find({ submitted: true });
        res.json(submittedVendors);
    } catch (error) {
        console.error('Error fetching submitted vendors:', error);
        res.status(500).send('An error occurred while fetching submitted vendors.');
    }
});

// Route for approving a vendor
app.put('/approve-vendor/:id', async (req, res) => {
    try {
        const vendorId = req.params.id;
        // Update the vendor's approval status in the database
        await Vendor.findByIdAndUpdate(vendorId, { approved: true });
        res.status(200).send('Vendor approved successfully.');
    } catch (error) {
        console.error('Error approving vendor:', error);
        res.status(500).send('An error occurred while approving vendor.');
    }
});

// Route for rejecting a vendor
app.put('/reject-vendor/:id', async (req, res) => {
    try {
        const vendorId = req.params.id;
        // Update the vendor's approval status in the database
        await Vendor.findByIdAndUpdate(vendorId, { approved: false });
        res.status(200).send('Vendor rejected successfully.');
    } catch (error) {
        console.error('Error rejecting vendor:', error);
        res.status(500).send('An error occurred while rejecting vendor.');
    }
});


app.use(express.json());

app.get('/api/vendors', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendors' });
    }
});

const port = 8888;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});