const express = require("express");
const { userAuth } = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_DATA = "firstName lastName";

//Get all pending request for the logged in user
userRouter.get("/user/request/received",
    userAuth,
    async (req, res) => {
        try {

            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.find({
                toUserId: loggedInUser._id,
                status: "interested",
            }).populate("fromUserId", USER_DATA);

            res.json({
                message: "Data fetched sucessfully",
                data: connectionRequest
            })

        } catch (err) {
            res.status(400).send("Error: " + err.message);
        }
    });

//getting all the connection that a user received 
userRouter.get("/user/connections",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.find({
                $or: [
                    { toUserId: loggedInUser._id, status: "accepted" },
                    { fromUserId: loggedInUser._id, status: "accepted" }
                ],
            }).populate("fromUserId", USER_DATA)
                .populate("toUserId", USER_DATA);
            const data = connectionRequest.map((row) => {
                if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return row.toUserId;
                }
                return row.fromUserId;
            });
            res.json({ data });
        } catch (err) {
            res.status(400).send("Error: " + err.message)
        }
    }
);


//Feed API  for showing profiles
userRouter.get("/feed",
    userAuth,
    async (req, res) => {
        try {

            const loggedInUser = req.user;

            const connectionRequests = await ConnectionRequest.find({
                $or: [
                    { fromUserId: loggedInUser._id },
                    { toUserId: loggedInUser._id }
                ],
            }).select("fromUserId toUserId");

            const hideUserFromFeed = new Set();
            connectionRequests.forEach((req) => {
                hideUserFromFeed.add(req.fromUserId.toString());
                hideUserFromFeed.add(req.toUserId.toString());
            });

            const users = await User.find({
                $and: [
                    { _id: { $nin: Array.from(hideUserFromFeed) } },// finding the users which are nin[not in] the array 
                    { _id: { $ne: loggedInUser._id } },// find the user who is not a logged in user
                ],
            }).select(USER_DATA);
            res.send(users);

        } catch (err) {
            res.status(400).send("Error: " + err.message);
        }
    }
)

module.exports = userRouter;