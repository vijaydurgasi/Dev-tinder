--------------------------- s-2 E-3----------------- 

const express = require("express");
# 1.imported a server by using require

const app = express();
# 2.creating a server by using a app variable 

app.use("/contact", (req, res) => {
    res.send("contacts are yet to update")
});
# 5. created a /contact 

app.use("/test", (req, res) => {
    res.send("Testing")
});

app.use("/", (req, res) => {
    res.send("Namaste Developers...")
});
# 4. we are sending a req to the server and getting res back from the server 
# if we want to route to any part we need to mention it by using "path" also / should be at the end bcz express matches the / first like even when the path is /test if our / path is the starting then i identifies / and prints message in / not the message in /test

app.listen(9000, () => {
    console.log("server created at port 9000")
})
# 3.server is listeing at port number 9000


