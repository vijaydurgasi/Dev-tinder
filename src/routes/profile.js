const express = require("express");
const { userAuth } = require("./middleWare/auth");

const profileRouter = express.Router();

//profile
profileRouter.get("/profile", userAuth, async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Invalid user")
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
});

module.exports = profileRouter;