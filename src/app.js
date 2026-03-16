require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleWare/auth");

app.use(express.json());
app.use(cookieParser());


connectDB().then(() => {
    console.log("🚀 connection is successfull to data base")
    app.listen(9000, () => {
        console.log("server is running in 9000...")
    });
}).catch(err => {
    console.log(err, "cannot connect to Data base")
});
