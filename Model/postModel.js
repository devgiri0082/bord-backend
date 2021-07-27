let mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      unique: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: false,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
      required: false,
      unique: false,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
let postModel = new mongoose.model("post", postSchema);
module.exports = postModel;
