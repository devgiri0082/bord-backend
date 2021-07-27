const postModel = require("../../Model/postModel");
const UserModel = require("../../Model/UserModel");

let deletePost = async (req, res) => {
  try {
    console.log(req.userInfo.username, req.params.slug);
    let response = await deletePostController(
      req.params.slug,
      req.userInfo.username
    );
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

async function deletePostController(slug, username) {
  try {
    let givenUser = await UserModel.findOne({ username: username });
    if (!givenUser) return { code: 400, message: "no such user exist" };
    let allPost = await postModel.find({});
    console.log(allPost);
    let givenPost = await postModel.findOne({ slug: slug });
    if (!givenPost) return { code: 400, message: "no such post exist" };
    console.log(givenPost._id);
    await UserModel.update(
      { username: username },
      { $pull: { posts: givenPost._id } }
    );
    await postModel.remove({ slug: slug });
    return { code: 200, message: "post deleted successfully" };
  } catch (err) {
    console.log(err);
    return { code: 500, err: err };
  }
}

module.exports = deletePost;
