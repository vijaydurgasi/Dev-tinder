const validator = require("validator")

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body
    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    } else if (firstName.length < 4 || firstName.length > 10) {
        throw new Error("max limit of firstName is 10 and min name should have 4 letters")
    } else if (lastName.length < 4 || lastName.length > 10) {
        throw new Error("max limit of firstName is 10 and min name should have 4 letters")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("password is not strong!!!")
    }
};

module.exports = { validateSignUpData }
//