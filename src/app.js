require("dotenv").config();

const express = require("express");

const connectDB = require("./config/database");

const User = require("./models/user")

const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {

    const user = new User({
        firstName: "vijay",
        lastName: "durgasi",
        emailId: "vijay@gmail.com",
        password: "Vijay@123"
    });
    try {
        await user.save();
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send("Got an error while saving the user " + err.message)
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


