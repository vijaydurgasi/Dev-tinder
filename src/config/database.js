const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb://vijay:Vijay_89780@ac-ycdm767-shard-00-02.obavxw4.mongodb.net:27017/NamasteDB?tls=true&directConnection=true&authSource=admin"
    );
};

module.exports = connectDB;