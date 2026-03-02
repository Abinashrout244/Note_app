const { Post } = require("../models/post.model");

// Get all posts
const allPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch posts" });
  }
};

// Create a post
const createPost = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const loggedInUser = req.getUser;

    if (!loggedInUser?._id) {
      return res.status(401).json({ msg: "Login required" });
    }

    if (!title?.trim() && !description?.trim() && !image) {
      return res.status(400).json({ msg: "Post content is required" });
    }

    const newPost = new Post({
      userId: loggedInUser._id,
      author:
        `${loggedInUser.firstName || ""} ${loggedInUser.lastName || ""}`.trim() ||
        "Anonymous",
      avatar: loggedInUser.photoURL || "",
      title: title?.trim() || "",
      description: description?.trim() || "",
      image: image || "",
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to create post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const loggedInUserId = req.getUser?._id?.toString();

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (!loggedInUserId) {
      return res.status(401).json({ error: "Login required" });
    }

    // Allow delete only by post owner
    if (post.userId?.toString() !== loggedInUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.likes += 1;
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to like post" });
  }
};

// Add comment
const addComment = async (req, res) => {
  try {
    const text = req.body?.text?.trim();
    const loggedInUser = req.getUser;

    if (!text) return res.status(400).json({ msg: "Comment text is required" });
    if (!loggedInUser?._id) {
      return res.status(401).json({ msg: "Login required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.comments.push({
      userId: loggedInUser._id,
      author:
        `${loggedInUser.firstName || ""} ${loggedInUser.lastName || ""}`.trim() ||
        "Anonymous",
      avatar: loggedInUser.photoURL || "",
      text,
      createdAt: new Date().toLocaleString(),
    });
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to add comment" });
  }
};

module.exports = { allPosts, addComment, likePost, createPost, deletePost };
