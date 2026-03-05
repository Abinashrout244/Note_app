const express = require("express");
const {
  allPosts,
  createPost,
  likePost,
  addComment,
  deletePost,
} = require("../controllers/post.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/post.middleware");

const postRouter = express.Router();

postRouter.get("/posts", allPosts);
postRouter.post("/post", authMiddleware, upload.single("image"), createPost);
postRouter.put("/posts/:id/like", likePost);
postRouter.patch("/posts/:id/like", likePost);
postRouter.post("/posts/:id/comment", authMiddleware, addComment);
postRouter.delete("/posts/:id", authMiddleware, deletePost);

module.exports = { postRouter };
