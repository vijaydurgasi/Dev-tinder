const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt");

const authRoute = express.Router();

//writing the data into Data base
authRoute.post("/signUp", async (req, res) => {

    // console.log(req.body);
    try {
        validateSignUpData(req)

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash)

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        await user.save();
        res.send("User added successfully")
    } catch (err) {
        // console.log(err);
        res.status(400).send("Error : " + err.message);
    }

});

//Login validation
authRoute.post("/Login", async (req, res) => {
    try {
        const { emailId, password } = req.body

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await user.getJWT();
            res.cookie("token", token);
            res.send("Login successful...");
        } else {
            throw new Error("Invalid!");
        }

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
});

module.exports = authRoute;