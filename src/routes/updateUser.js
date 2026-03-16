const express = require("express");
const User = require("../models/user");

const updateUser = express.Router();
//Update the user data 
updateUser.patch("/updateUser/:userId", async (req, res) => {
    const data = req.body;
    const userId = req.params?.userId;
    try {
        const ALLOWED_UPDATES = [
            "firstName",
            "lastName",
            "about",
            "gender",
            "skills",
            "age",
        ];
        const isUpadteAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpadteAllowed) {
            throw new Error("update not allowwed");
        }
        if (data.skills.length > 10) {
            throw new Error("skills cannot be greater than 10");
        }
        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
        res.send(updatedUser)
    } catch (err) {
        res.status(400).send("upadte failed " + err.message)
    }
});


module.exports = updateUser;