const adminAuth = (req, res, next) => {
    console.log("checking Admin access ")
    const token = "xyz";
    const isAuthorizes = token === "xyz";
    if (!isAuthorizes) {
        res.status(401).send("unauthorizes access")
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("checking user Auth");
    const token = "123";
    const isAuthorizes = token === "123s";
    if (!isAuthorizes) {
        res.status(401).send("unauthorizes access")
    } else {
        next();
    }
}

module.exports = { adminAuth, userAuth }