import axios from "axios";
import React, { useContext } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { deleteNote } from "../utils/NoteSlice";
import { motion } from "framer-motion";
import { ThemeContext } from "../utils/ThemeContext";
import toast from "react-hot-toast";

export default function NoteCard({ note, modal }) {
  const dispatch = useDispatch();
  const createNote = new Date(note?.createdAt).toLocaleDateString();
  const updateNote = new Date(note?.updatedAt).toLocaleDateString();
  const { theme } = useContext(ThemeContext);
  const isUpdated = createNote !== updateNote;
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        BASE_URL + "/api/note/delete-note/" + note._id,
        { withCredentials: true },
      );
      dispatch(deleteNote(note?._id));
      toast.success("Note Deleted Successfully ");
      //console.log(res);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={` ${theme === "Light" ? "bg-white/70" : "bg-slate-900"} backdrop-blur-xl p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-white/40 transition-all duration-300 w-full max-w-md mx-auto`}
    >
      <h3
        className={`${theme === "Light" ? "text-slate-800" : "text-gray-300"} font-bold text-xl uppercase`}
      >
        {note.title}
      </h3>

      <p className="text-gray-500 mt-3 leading-relaxed capitalize">
        {note.content}
      </p>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-linear-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full shadow-md hover:scale-105 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={modal}
          className="flex-1 px-4 py-2 bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl text-sm font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          Delete
        </button>
      </div>

      <div className="text-slate-400 text-xs pt-4 flex justify-end gap-3 border-t mt-6">
        {isUpdated ? (
          <>
            <p className="text-xs font-semibold">Create At..</p>
            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            <span>{new Date(note.createdAt).toLocaleTimeString()}</span>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold">Updated At..</p>
            <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
            <span>{new Date(note.updatedAt).toLocaleTimeString()}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
