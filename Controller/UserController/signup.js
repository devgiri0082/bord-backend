const UserModel = require("../../Model/UserModel");
const bcrypt = require("bcrypt");

let signUp = async (req, res) => {
  let { username, email, password, profilePic } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  if (!validateEmail(email))
    return res.status(400).json({ message: "invalid email address" });
  try {
    let response = await signUpController(
      username,
      email,
      hashedPassword,
      profilePic
    );
    return res.status(response.code).json({ message: response.message });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

async function signUpController(username, email, password, photo) {
  try {
    let givenUserName = await UserModel.findOne({ username: username });
    if (givenUserName)
      return { code: 400, message: "given username already exist" };
    let givenEmail = await UserModel.findOne({ email: email });
    if (givenEmail) return { code: 400, message: "given email already exist" };
    let newUser = new UserModel({
      username: username,
      email: email,
      password: password,
      picture: photo,
    });
    await newUser.save();
    return { code: 200, message: "successfully saved the user" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
}

function validateEmail(email) {
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}
module.exports = signUp;
