const RefreshTokenModel = require("../../Model/RefreshTokenModel");
const UserModel = require("../../Model/UserModel");
const jwt = require("jsonwebtoken");
let refreshToken = async (req, res) => {
  try {
    let givenUser = await UserModel.findOne({
      username: req.userInfo.username,
    });
    if (!givenUser)
      return res.status(400).json({ message: "user does not exist" });
    let givenRefreshToken = await RefreshTokenModel.findOne({
      userId: givenUser._id,
      token: req.headers.authorization.split(" ")[1],
    });
    console.log(givenRefreshToken);
    if (!givenRefreshToken)
      return res.status(400).json({ message: "refresh token is expired" });
    let userDetails = {
      username: req.userInfo.username,
    };
    let accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    });
    let refreshToken = jwt.sign(userDetails, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });
    response = await saveRefreshToken(refreshToken, givenUser._id);
    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
let saveRefreshToken = async (refreshToken, id) => {
  try {
    await RefreshTokenModel.deleteOne({ userId: id });
    // console.log(deleting);
    let newRefreshToken = new RefreshTokenModel({
      token: refreshToken,
      userId: id,
    });
    await newRefreshToken.save();
    return { code: 200, message: "successfully saved the refresh token" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
};

module.exports = refreshToken;
