import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { setNotes } from "../utils/NoteSlice";
import { Cross, CrossIcon, PlusIcon } from "lucide-react";
import { ThemeContext } from "../utils/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function NoteModal({ close, editNote, dashTitle }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTags, setInputTags] = useState("");
  const [err, setErr] = useState("");
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const addClick = () => {
    if (!inputTags.trim()) return;
    //setTags((prev) => [...prev, inputTags.trim()]);
    setTags([...tags, inputTags.trim()]);
    setInputTags("");
  };

  const removeClick = (itemIndex) => {
    const remove = setTags((prev) =>
      prev.filter((item, index) => index != itemIndex),
    );
    return remove;
  };

  //  Prefill when editing
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setTags(editNote.tags);
    } else {
      setTitle("");
      setContent("");
      setTags(tags);
    }
  }, [editNote]);

  //  Save Logic (Add or Update)
  const handleSave = async () => {
    try {
      if (!title || !content) {
        return alert("Fields cannot be empty");
      }

      //  UPDATE NOTE
      if (editNote) {
        const res = await axios.put(
          `${BASE_URL}/api/note/edit-note/${editNote._id}`,
          { title, content, tags },
          { withCredentials: true },
        );
        toast.success("Note Updated Successfully ");
      }
      //  ADD NOTE
      else {
        const res = await axios.post(
          `${BASE_URL}/api/note/add-note`,
          { title, content, tags },
          { withCredentials: true },
        );
        toast.success("Note Added Successfully ");
      }

      //  Refresh Notes After Add/Update
      const updatedNotes = await axios.get(`${BASE_URL}/api/note/all-note`, {
        withCredentials: true,
      });

      dispatch(setNotes(updatedNotes.data.data));

      close(); // close modal
    } catch (err) {
      // console.log(err.response?.data || err.message);
      setErr(err?.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center px-4 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`relative w-full max-w-md  rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 ${theme == "Light" ? "bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100" : "bg-slate-800"}`}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm font-bold shadow"
          >
            <CrossIcon />
          </button>

          <h2 className="text-2xl font-bold text-gray-800">{dashTitle}</h2>

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 backdrop-blur border border-white/40 focus:ring-4 focus:ring-indigo-300 outline-none transition-all duration-300 shadow-sm"
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full p-3 rounded-xl bg-white/70 backdrop-blur border border-white/40 focus:ring-4 focus:ring-indigo-300 outline-none resize-none transition-all duration-300 shadow-sm"
          />

          {err && (
            <p className="text-red-600 font-semibold">ERROR:{err?.message}</p>
          )}

          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Add tag"
              value={inputTags}
              onChange={(e) => setInputTags(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-white/70 backdrop-blur border border-white/40 focus:ring-4 focus:ring-indigo-300 outline-none transition"
            />

            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-white text-lg font-bold shadow-lg hover:scale-110 transition-all duration-300"
              onClick={addClick}
            >
              <PlusIcon />
            </button>
          </div>

          <ul className="flex flex-wrap gap-2">
            {tags.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 bg-white/70 backdrop-blur text-indigo-700 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-sm font-medium">{item}</p>
                <button
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-300 hover:bg-red-500 hover:text-white transition text-xs font-bold"
                  onClick={() => removeClick(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={close}
              className="px-4 py-2 rounded-xl bg-white/60 hover:bg-white transition shadow"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-[1.05] transition-all duration-300"
            >
              {editNote ? "Update" : "Add"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
