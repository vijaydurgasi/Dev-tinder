require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());

//writing the data into Data base
app.post("/signUp", async (req, res) => {

    // console.log(req.body);

    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send("Got an error while saving the user " + err.message)
    }

});

//Get the user data from the data base
app.get("/user", async (req, res) => {
    const useremail = req.body.emailId;
    try {
        const user = await User.find({ emailId: useremail });
        if (user.length === 0) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }
    } catch {
        res.status(400).send("something went wrong")
    }
});

//Get all the user data from the data base
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch {
        res.status(400).send("something went wrong")
    }
})

//Delete API 
app.delete("/deleteUser", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
    } catch {
        res.status(400).send("somethin went wrong")
    }
})

//Update the user data 
app.patch("/updateUser/:userId", async (req, res) => {
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

connectDB().then(() => {
    console.log("🚀 connection is successfull to data base")
    app.listen(9000, () => {
        console.log("server is running in 9000...")
    });
}).catch(err => {
    console.log(err, "cannot connect to Data base")
});


