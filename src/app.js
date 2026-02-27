const express = require("express");

const app = express();

// app.use("/contact", (req, res) => {
//     res.send("Yet to add...")
// });

// app.use("/test", (req, res) => {
//     res.send("testing...")
// });

// app.use("/", (req, res) => {
//     res.send("Namaste developers...")
// });

// app.get("/user/:UserId", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstname: "vijay",
//         lastname: "durgasi"
//     })
// });

// app.post("/user", (req, res) => {
//     res.send("Data has sucessfully posted")
// });

// app.delete("/user", (req, res) => {
//     res.send("Data has sucessfully deleted")
// });

app.get("/user", (req, res, next) => {
    // res.send("Response-1")
    console.log("Response-1")
    next();
},
    (req, res, next) => {
        // res.send("Response - 2")
        console.log("Response-2")
        next();
    },
    (req, res, next) => {
        // res.send("Response - 3")
        console.log("Response-3")
        next();
    },
    (req, res, next) => {
        res.send("Respponse - 4")
        console.log("Response-4")
        // next();
    },
)

app.listen(9000, () => [
    console.log("server is running in 9000...")
])