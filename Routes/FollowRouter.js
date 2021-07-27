let express = require("express");
const followUser = require("../Controller/FollowController/followUser");
const possibleFollow = require("../Controller/FollowController/possibleFollow");
const unfollowUser = require("../Controller/FollowController/unfollowUser");

let router = express.Router();
router.post("/follow/:username", followUser);
router.post("/unfollow/:username", unfollowUser);
router.get("/possibleFollow", possibleFollow);
module.exports = router;
