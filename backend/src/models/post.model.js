const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  author: String,
  avatar: String,
  title: String,
  description: String,
  image: String,
  likes: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      author: String,
      avatar: String,
      text: String,
      createdAt: String,
    },
  ],
  createdAt: { type: String, default: () => new Date().toLocaleString() },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
