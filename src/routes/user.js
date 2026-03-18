const express = require("express");
const { userAuth } = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

//Get all pending request for the logged in user
userRouter.get("/user/request/received",
    userAuth,
    async (req, res) => {
        try {

            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.find({
                toUserId: loggedInUser._id,
                status: "interested",
            }).populate("fromUserId", "firstName lastName");

            res.json({
                message: "Data fetched sucessfully",
                data: connectionRequest
            })

        } catch (err) {
            res.status(400).send("Error: " + err.message);
        }
    });

module.exports = userRouter;