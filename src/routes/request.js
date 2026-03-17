const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleWare/auth");
const { Connection } = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");

const requestRoute = express.Router();

requestRoute.post("/request/send/:status/:toUserid",
    userAuth,
    async (req, res) => {
        try {

            const fromUserId = req.user._id;
            const toUserId = req.params.toUserid;
            const status = req.params.status;

            const allowedStatus = ["ignore", "interested"]; // check 
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: "Invalid status type: " + status })
            };

            const toUser = await User.findById(toUserId);
            if (!toUser) {
                throw new Error("User Does not present or Invalid")
            };

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ],
            });
            if (existingConnectionRequest) {
                throw new Error("connection request is already sent")
            };

            const connectionRequest = new ConnectionRequest({ //instance of the Request
                fromUserId,
                toUserId,
                status,
            });
            const data = await connectionRequest.save();
            res.json({
                message: req.user.firstName + " is " + status + " in " + toUser.firstName,
                data,
            });

        } catch (err) {
            res.status(400).send("Error " + err.message);
        }
    }
);

module.exports = requestRoute;