const LinkModel = require("../../Model/LinkModel");
const postModel = require("../../Model/postModel");
const UserModel = require("../../Model/UserModel");

let getPosts = async (req, res) => {
  console.log(req.userInfo.username);
  let givenUser = await UserModel.findOne({ username: req.userInfo.username });
  if (!givenUser)
    return res.status(400).json({ message: "Given user does not exist" });
  let following = await LinkModel.findOne(
    { user: givenUser._id },
    { following: 1 }
  );
  following = following.following;
  following.push(givenUser._id);
  console.log(following);
  let allPosts = [];
  for (let i = 0; i < following.length; i++) {
    let post = await postModel
      .find({ user: following[i] })
      .populate("user", "username");
    console.log(post);
    allPosts.push(...post);
    if (allPosts.length > 19) break;
  }
  res.status(200).json({ message: allPosts });
};

module.exports = getPosts;
