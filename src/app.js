require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
app.use(express.json());

//writing the data into Data base
app.post("/signUp", async (req, res) => {

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
app.post("/Login", async (req, res) => {
    try {
        const { emailId, password } = req.body

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send("Login successful...");
        } else {
            throw new Error("Invalid!");
        }

    } catch (err) {
        res.status(400).send("Error: " + err.message)
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
    } catch (err) {
        res.status(400).send("Error : " + err.message)
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
