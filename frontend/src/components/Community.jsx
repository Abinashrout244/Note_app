import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import PostItem from "./PostItem";
import {
  Image as ImageIcon,
  Send,
  X,
  Paperclip,
  ArrowLeft,
} from "lucide-react";

const API = `${BASE_URL}/api/community`;
const MAX_FILE_SIZE_MB = 5;

const Community = () => {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [popupMsg, setPopupMsg] = useState("");

  // Auto-resize textarea logic
  const textareaRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (popupMsg) {
      const timer = setTimeout(() => setPopupMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMsg]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      setPopupMsg(`Max ${MAX_FILE_SIZE_MB}MB allowed`);
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async () => {
    if (!description.trim() && !imageFile) return;

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(`${API}/post`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setDescription("");
      setImagePreview(null);
      setImageFile(null);

      fetchPosts();

      window.scrollTo({ top: 0, behavior: "smooth" });

      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch (err) {
      console.error(err);
      setPopupMsg("Failed to post!");
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(`${API}/posts/${id}`, { withCredentials: true });
      fetchPosts();
      setPopupMsg("Deleted");
    } catch (err) {
      setPopupMsg("Error deleting");
    }
  };

  const handleLike = async (post) => {
    try {
      await axios.put(`${API}/posts/${post._id}/like`);
      fetchPosts();
    } catch (err) {
      setPopupMsg("Like failed");
    }
  };

  const handleComment = async (postId, commentText, setCommentText) => {
    if (!commentText.trim()) return;
    try {
      await axios.post(
        `${API}/posts/${postId}/comment`,
        { text: commentText },
        { withCredentials: true },
      );
      setCommentText("");
      fetchPosts();
    } catch (err) {
      setPopupMsg("Comment failed");
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white pb-32">
      <Link
        to="/"
        className="group flex  self-start m-2 md:m-5 gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/40 text-gray-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </Link>
      {/* Toast Notification */}
      {popupMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-purple-600 px-6 py-2 rounded-full shadow-2xl z-50 animate-bounce text-sm font-bold">
          {popupMsg}
        </div>
      )}

      {/* Main Feed Container */}
      <div className="w-full max-w-2xl px-4 pt-24 flex flex-col gap-8">
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            handleLike={() => handleLike(post)}
            handleComment={handleComment}
            handleDeletePost={handleDeletePost}
            currentUser={user}
          />
        ))}
      </div>

      {/* WHATSAPP STYLE FIXED INPUT */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 pt-4 bg-linear-to-t from-black via-black/90 to-transparent backdrop-blur-[2px] z-40">
        <div className="max-w-2xl mx-auto relative">
          {/* Floating Image Preview */}
          {imagePreview && (
            <div className="absolute bottom-full mb-4 left-2 animate-in slide-in-from-bottom-2">
              <div className="relative group">
                <img
                  src={imagePreview}
                  className="w-24 h-24 object-cover rounded-2xl border-2 border-purple-500 shadow-2xl"
                  alt="Preview"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Input Bar Container */}
          <div className="bg-[#1f2937]/90 backdrop-blur-2xl border border-white/10 rounded-4xl p-2 flex items-end gap-1 shadow-2xl">
            {/* Attachment Button */}
            <label className="p-3 hover:bg-white/5 rounded-full cursor-pointer transition-all active:scale-90 shrink-0">
              <Paperclip size={22} className="text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0 py-1">
              <input
                type="text"
                placeholder="Topic..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-purple-400 placeholder:text-purple-400/30 focus:outline-none px-2 mb-0.5"
              />
              <textarea
                ref={textareaRef}
                placeholder="Share your thoughts..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="1"
                className="bg-transparent border-none text-white placeholder:text-gray-500 focus:outline-none px-2 max-h-40 resize-none overflow-y-auto w-full leading-normal"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
            </div>

            {/* Emoji/Secondary Action (Optional)
            <button className="p-3 text-gray-400 hover:text-purple-400 hidden sm:block">
              <Smile size={22} />
            </button> */}

            {/* Send Button */}
            <button
              onClick={handleCreatePost}
              disabled={!description.trim() && !imagePreview}
              className={`p-3 rounded-full transition-all shrink-0 ${
                description.trim() || imagePreview
                  ? "bg-purple-600 text-white scale-100 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                  : "bg-gray-800 text-gray-600 scale-95"
              }`}
            >
              <Send
                size={22}
                fill={description.trim() ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
