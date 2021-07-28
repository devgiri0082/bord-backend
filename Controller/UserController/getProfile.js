const LinkModel = require("../../Model/LinkModel");
const UserModel = require("../../Model/UserModel");

let getProfile = async (req, res) => {
  console.log(req.params.username);
  let givenUser = await UserModel.findOne(
    {
      username: req.params.username,
    },
    { password: 0, email: 0 }
  ).populate("posts");
  console.log(givenUser._id);
  let givenUserLink = await LinkModel.findOne({ user: givenUser._id });
  console.log(givenUserLink);
  if (!givenUser) return res.status(400).json({ message: "invalid user" });
  res.status(200).json({ message: { user: givenUser, link: givenUserLink } });
};

module.exports = getProfile;
