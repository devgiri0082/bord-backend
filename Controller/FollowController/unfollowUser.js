const LinkModel = require("../../Model/LinkModel");
const UserModel = require("../../Model/UserModel");

let unfollowUser = async (req, res) => {
  try {
    console.log(req.params.username, req.userInfo.username);
    let response = await unfollowController(
      req.userInfo.username,
      req.params.username
    );
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

async function unfollowController(follower, following) {
  try {
    if (follower === following)
      return { code: 400, message: "you can't unfollow yourself" };
    let givenFollower = await UserModel.findOne({ username: follower });
    if (!givenFollower)
      return { code: 400, message: `${follower} does not exist` };
    let givenFollowing = await UserModel.findOne({ username: following });
    if (!givenFollowing)
      return { code: 400, message: `${following} does not exist` };
    if (
      !(await LinkModel.findOne({
        user: givenFollower._id,
        following: { $in: [givenFollowing._id] },
      }))
    )
      return { code: 400, message: `You aren't following ${following}` };
    await LinkModel.update(
      {
        user: givenFollower._id,
      },
      {
        $pull: { following: givenFollowing._id },
      }
    );
    await LinkModel.update(
      {
        user: givenFollowing._id,
      },
      {
        $pull: { followers: givenFollower._id },
      }
    );
    return { code: 200, message: `You unfollow ${following}` };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
}
module.exports = unfollowUser;
