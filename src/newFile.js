const bcrypt = require("bcrypt");
const collection = require("./config");
const { app } = require('.');

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username not found");
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (isPasswordMatch) {
                req.session.user = check; // Add this line to store the user in the session
                res.render("home");
            } else {
                res.send("Wrong password");
            }

        } try { } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred during login.");
        }
    } finally { }
});
