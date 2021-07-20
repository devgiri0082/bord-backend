let mongoose = require("mongoose");

let refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
});

let RefreshTokenModel = new mongoose.model("refreshToken", refreshTokenSchema);

module.exports = RefreshTokenModel;
