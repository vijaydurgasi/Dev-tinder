const express = require("express");
const User = require("./models/user");

const userDetails = express.Router();

//Get the user data from the data base
userDetails.get("/user", async (req, res) => {
    const useremail = req.body.emailId;
    try {
        const user = await User.find({ emailId: useremail });
        if (user.length === 0) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
});

//Get all the user data from the data base
userDetails.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch {
        res.status(400).send("something went wrong")
    }
});

module.exports = userDetails;