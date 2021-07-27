let express = require("express");
const refreshToken = require("../Controller/UserController/refreshToken");

let router = express.Router();

router.post("/", refreshToken);
module.exports = router;
