const postModel = require("../../Model/postModel");
const UserModel = require("../../Model/UserModel");
const { v4: uuidv4 } = require("uuid");
const slug = require("slug");
let createPost = async (req, res) => {
  try {
    let response = await postController(
      req.userInfo.username,
      req.body.content
    );
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    return { code: 500, message: "err" };
  }
};
async function postController(username, content) {
  try {
    let givenUser = await UserModel.findOne({ username: username });
    if (!givenUser) return { code: 400, message: "invalid user" };
    let newPost = new postModel({
      content: content,
      user: givenUser._id,
      slug: `${uuidv4()}`,
    });
    await newPost.save();
    console.log(newPost);
    await UserModel.updateOne(
      { username: username },
      { $push: { posts: newPost._id } }
    );
    return { code: 200, message: "new post created" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
}

module.exports = createPost;
