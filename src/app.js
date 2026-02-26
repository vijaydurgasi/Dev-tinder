const express = require("express");

const app = express();

app.use("/contact", (req, res) => {
    res.send("contacts are yet to update")
});

app.use("/test", (req, res) => {
    res.send("Testing")
});

app.use("/", (req, res) => {
    res.send("Namaste Developers...")
});

app.listen(9000, () => {
    console.log("server created at port 9000...")
})