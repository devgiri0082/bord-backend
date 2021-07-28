let express = require("express");
const getProfile = require("../Controller/UserController/getProfile");

let router = express.Router();

router.get("/:username", getProfile);
module.exports = router;
