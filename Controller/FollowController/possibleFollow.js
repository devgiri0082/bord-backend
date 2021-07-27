const LinkModel = require("../../Model/LinkModel");
const UserModel = require("../../Model/UserModel");

let possibleFollow = async (req, res) => {
  try {
    console.log(req.userInfo.username);
    let response = await possibleFollowController(req.userInfo.username);
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

async function possibleFollowController(user) {
  try {
    let givenUser = await UserModel.findOne({ username: user });
    if (!givenUser) return { code: 500, message: "given user does not exist" };
    let possible = await LinkModel.find({
      followers: { $nin: [givenUser._id] },
      user: { $not: { $eq: givenUser._id } },
    })
      .limit(10)
      .populate("user");

    console.log(possible);
    possible = possible.map((elem) => {
      let info = {
        followers: elem.followers.length,
        username: elem.user.username,
      };
      return info;
    });
    return { code: 200, message: possible };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
}
module.exports = possibleFollow;
