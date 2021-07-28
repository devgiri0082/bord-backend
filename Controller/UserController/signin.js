const UserModel = require("../../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshTokenModel = require("../../Model/RefreshTokenModel");
let signIn = async (req, res) => {
  try {
    let { username, password } = req.body;
    let response = await signInController(username, password);
    if (response.code !== 200)
      return res.status(response.code).json({ message: response.message });
    let userDetails = {
      username: response.message.username,
    };
    let accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    });
    let refreshToken = jwt.sign(userDetails, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });
    response2 = await saveRefreshToken(refreshToken, response.message._id);
    if (response2.code === 200)
      return res.status(200).json({
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    else return res.status(response.code).json({ message: response.message });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

let signInController = async (username, password) => {
  try {
    let givenUser = await UserModel.findOne({ username: username });
    if (!givenUser) return { code: 400, message: "invalid username" };
    const samePassword = await bcrypt.compare(password, givenUser.password);
    if (!samePassword) return { code: 400, message: "invalid password" };
    return { code: 200, message: givenUser };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
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
    return {
      code: 200,
      message: "successfully saved the refresh token",
      id: id,
    };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
};

module.exports = signIn;
