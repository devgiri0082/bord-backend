let mongoose = require("mongoose");

let refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

let RefreshTokenModel = new mongoose.model("refreshToken", refreshTokenSchema);

module.exports = RefreshTokenModel;
