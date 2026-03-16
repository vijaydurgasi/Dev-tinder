require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/authentication");
const deleteUser = require("./routes/deleteUser");
const getUser = require("./routes/getUser");
const updateUser = require("./routes/updateUser");
const profile = require("./routes/profile");

connectDB().then(() => {
    console.log("🚀 connection is successfull to data base")
    app.listen(9000, () => {
        console.log("server is running in 9000...")
    });
}).catch(err => {
    console.log(err, "cannot connect to Data base")
});
