const RefreshTokenModel = require("../../Model/refreshTokenModel");
const UserModel = require("../../Model/UserModel");

let signOut = async (req, res) => {
  try {
    console.log(req.userInfo);
    let { username } = req.userInfo;
    let response = await signOutController(username);
    res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

let signOutController = async (username) => {
  try {
    console.log(username);
    let givenUserName = await UserModel.findOne({ username: username });
    if (!givenUserName) return { code: 400, message: "user does not exist" };
    let givenUserRefreshToken = await RefreshTokenModel.findOne({
      userId: givenUserName._id,
    });
    await givenUserRefreshToken.updateOne({ token: null });
    return { code: 200, message: "logout successful" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
};

module.exports = signOut;
