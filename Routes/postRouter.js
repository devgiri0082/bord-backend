let express = require("express");
const createPost = require("../Controller/postController/createPost");
const deletePost = require("../Controller/postController/deletePost");
const getPosts = require("../Controller/postController/getPosts");

let router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.delete("/:slug", deletePost);

module.exports = router;
