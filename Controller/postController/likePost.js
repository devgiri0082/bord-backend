const postModel = require("../../Model/postModel");
const UserModel = require("../../Model/UserModel");

let likePost = async (req, res) => {
  try {
    let response = await likeController(req.userInfo.username, req.params.slug);
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

async function likeController(username, slug) {
  try {
    let givenUser = await UserModel.findOne({ username: username });
    if (!givenUser) return { code: 400, message: "invalid user" };
    let givenPost = await postModel.findOne({ slug: slug });
    console.log(givenPost);
    if (!givenPost) return { code: 400, message: "invalid post" };
    await postModel.updateOne(
      { slug: slug },
      { $push: { likes: givenUser._id } }
    );
    return { code: 200, message: "successfully liked the post" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
}
module.exports = likePost;
