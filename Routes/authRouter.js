let express = require("express");
const checkAuthorization = require("../checkAuthorization");
const signIn = require("../Controller/UserController/signin");
const signOut = require("../Controller/UserController/signout");
const signUp = require("../Controller/UserController/signup");

let router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", checkAuthorization, signOut);
module.exports = router;
