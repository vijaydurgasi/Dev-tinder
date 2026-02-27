const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middleWare/auth")

app.use("/user/Admin", adminAuth);

app.get("/user/Admin/getUserData", (req, res) => {
    res.send("Access given to admin")
});

app.get("/user", userAuth, (req, res) => {
    res.send("user is verified")
});

app.get("/user/Admin/deleteUserData", (req, res) => {
    res.send("data is deleted")
});


app.listen(9000, () => [
    console.log("server is running in 9000...")
])