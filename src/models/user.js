const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        require: true,
        unique: true,
        toLowerCase: true,
        trim: true,
    },
    password: {
        type: String,
        minLength: 8
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid");
            }
        }
    },
    photo: {
        type: String
    },
    about: {
        type: String,
        default: "default about of the user"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;