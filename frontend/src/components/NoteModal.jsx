import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { setNotes } from "../utils/NoteSlice";

export default function NoteModal({ close, editNote, dashTitle }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  // ✅ Prefill when editing
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editNote]);

  // ✅ Save Logic (Add or Update)
  const handleSave = async () => {
    try {
      if (!title || !content) {
        return alert("Fields cannot be empty");
      }

      let res;

      // 🟢 UPDATE NOTE
      if (editNote) {
        res = await axios.put(
          `${BASE_URL}/api/note/edit-note/${editNote._id}`,
          { title, content },
          { withCredentials: true },
        );
      }
      // 🟢 ADD NOTE
      else {
        res = await axios.post(
          `${BASE_URL}/api/note/add-note`,
          { title, content },
          { withCredentials: true },
        );
      }

      // ✅ Refresh Notes After Add/Update
      const updatedNotes = await axios.get(`${BASE_URL}/api/note/all-note`, {
        withCredentials: true,
      });

      dispatch(setNotes(updatedNotes.data.data));

      close(); // close modal
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-[350px] p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-bold">{dashTitle}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <div className="flex justify-end gap-2">
          <button onClick={close} className="px-3 py-1 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-3 py-1 bg-indigo-600 text-white rounded-lg"
          >
            {editNote ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
