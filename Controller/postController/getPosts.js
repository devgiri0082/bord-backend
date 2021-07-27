const postModel = require("../../Model/postModel");
const UserModel = require("../../Model/UserModel");

let getPosts = (req, res) => {
  console.log(req.userInfo.username);
  let givenUser = UserModel.findOne({ username: req.userInfo.username });
  if (!givenUser)
    return res.status(400).json({ message: "Given user does not exist" });
  let posts = postModel.find({});
  console.log(posts);
  res.status(200).json({ message: posts });
};

module.exports = getPosts;
