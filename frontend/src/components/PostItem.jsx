import React from "react";
import { useState } from "react";
import { Trash2, Heart, MessageCircle } from "lucide-react";

const PostItem = ({
  post,
  handleLike,
  handleComment,
  handleDeletePost,
  currentUser,
}) => {
  const [commentText, setCommentText] = useState("");
  const comments = Array.isArray(post.comments) ? post.comments : [];
  const isOwner =
    currentUser?._id &&
    post?.userId &&
    String(post.userId) === String(currentUser._id);

  return (
    <div className="bg-[#111827]/50 backdrop-blur-md border border-white/10 p-5 rounded-4xl shadow-lg flex flex-col gap-4 transition-all hover:border-white/20 relative group">
      {isOwner && (
        <button
          onClick={() => handleDeletePost(post._id)}
          className="absolute top-6 right-6 text-white/50 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      )}

      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={
            post.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`
          }
          className="w-10 h-10 rounded-xl border border-white/10 object-cover"
          alt="Avatar"
        />
        <div>
          <p className="font-bold text-white text-sm">{post.author}</p>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        {post.title && (
          <h3 className="text-purple-400 font-bold text-base tracking-tight">
            {post.title}
          </h3>
        )}
        {post.description && (
          <p className="text-white/80 text-sm leading-relaxed">
            {post.description}
          </p>
        )}
        {post.image && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-white/5">
            <img
              src={post.image}
              className="w-full h-auto max-h-100 object-cover"
              alt="Post"
            />
          </div>
        )}
      </div>

      {/* Actions (Like/Comment Count) */}
      <div className="flex gap-6 py-2 border-y border-white/5">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-white/40 hover:text-pink-500 transition-all font-bold text-xs"
        >
          <Heart
            size={18}
            className={post.likes > 0 ? "fill-pink-500 text-pink-500" : ""}
          />
          {post.likes || 0}
        </button>
        <div className="flex items-center gap-2 text-white/40 font-bold text-xs">
          <MessageCircle size={18} />
          {comments.length}
        </div>
      </div>

      {/* --- ADDED: THE COMMENT LIST --- */}
      {/* --- COMMENT LIST (SCROLLBAR HIDDEN) --- */}
      {comments.length > 0 && (
        <div
          className="flex flex-col gap-3 mt-1 max-h-48 overflow-y-auto pr-1 
      /* Standard way to hide scrollbars in Tailwind */
      scrollbar-none 
      /* Firefox */
      [scrollbar-width:none] 
      /* Chrome, Safari, and Edge */
      [&::-webkit-scrollbar]:hidden"
        >
          {comments.map((c, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-3 border border-white/5 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-1"
            >
              <img
                src={
                  c.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${c.author}`
                }
                alt="avatar"
                className="w-7 h-7 rounded-lg border border-white/10 object-cover"
              />
              <div className="flex-1">
                <p className="text-purple-400 font-bold text-[11px] mb-0.5">
                  {c.author}
                </p>
                <p className="text-white/90 text-xs leading-snug">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment Input Bar */}
      <div className="flex gap-2 items-center mt-2">
        <input
          type="text"
          placeholder="Write a reply..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleComment(post._id, commentText, setCommentText)
          }
          className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
        />
        <button
          onClick={() => handleComment(post._id, commentText, setCommentText)}
          className="bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white px-4 py-2 rounded-xl text-[10px] font-bold transition-all active:scale-95"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default PostItem;
