const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 10
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 10
    },
    emailId: {
        type: String,
        require: true,
        unique: true,
        lowerCase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("In valid email address")
            }
        }
    },
    password: {
        type: String,
        minlength: 8
    },
    age: {
        type: Number,
        maxlength: 2
    },
    gender: {
        type: String,
        validate: {
            validator: function (value) {
                return ["male", "female", "other"].includes(value);
            },
            message: "Gender is not valid"
        }
    },
    photo: {
        type: String
    },
    about: {
        type: String,
        default: "default about",
        validate: {
            validator: function (value) {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 5;
            },
            message: "About section can have maximum 5 words"
        }
    },
    skills: {
        type: [String],
        validate: {
            validator: function (value) {

                return value.length <= 5;
            },
            message: "skills section can have maximum 5 words"
        }
    }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;