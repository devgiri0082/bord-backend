let mongoose = require("mongoose");

let LinkSchema = new mongoose.Schema({
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

let LinkModel = new mongoose.model("link", LinkSchema);
module.exports = LinkModel;
