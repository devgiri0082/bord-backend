let express = require("express");
const createPost = require("../Controller/postController/createPost");
const deletePost = require("../Controller/postController/deletePost");
const dislikePost = require("../Controller/postController/dislikePost");
const getPosts = require("../Controller/postController/getPosts");
const likePost = require("../Controller/postController/likePost");

let router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.delete("/:slug", deletePost);
router.post("/like/:slug", likePost);
router.post("/dislike/:slug", dislikePost);

module.exports = router;
