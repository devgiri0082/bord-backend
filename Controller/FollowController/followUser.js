const LinkModel = require("../../Model/LinkModel");
const UserModel = require("../../Model/UserModel");

let followUser = async (req, res) => {
  try {
    console.log(req.params.username, req.userInfo.username);
    let response = await followController(
      req.userInfo.username,
      req.params.username
    );
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

async function followController(follower, following) {
  try {
    if (follower === following)
      return { code: 400, message: "you can't follow yourself" };
    let givenFollower = await UserModel.findOne({ username: follower });
    if (!givenFollower)
      return { code: 400, message: `${follower} does not exist` };
    let givenFollowing = await UserModel.findOne({ username: following });
    if (!givenFollowing)
      return { code: 400, message: `${following} does not exist` };
    if (
      await LinkModel.findOne({
        user: givenFollower._id,
        following: { $in: [givenFollowing._id] },
      })
    )
      return { code: 400, message: `You already follow ${following}` };
    await LinkModel.update(
      {
        user: givenFollower._id,
      },
      {
        $push: { following: givenFollowing._id },
      }
    );
    await LinkModel.update(
      {
        user: givenFollowing._id,
      },
      {
        $push: { followers: givenFollower._id },
      }
    );
    return { code: 200, message: `You are following ${following}` };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
}

module.exports = followUser;
