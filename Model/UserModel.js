let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    required: false,
    unique: false,
  },
});
let UserModel = new mongoose.model("user", userSchema);

module.exports = UserModel;
