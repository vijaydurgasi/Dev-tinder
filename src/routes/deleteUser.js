const express = require("express");

const deleteUser = express.Router();

//Delete API 
deleteUser.delete("/deleteUser", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
    } catch {
        res.status(400).send("somethin went wrong")
    }
});

module.exports = deleteUser;