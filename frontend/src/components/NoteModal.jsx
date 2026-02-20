import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { setNotes } from "../utils/NoteSlice";

export default function NoteModal({ close, editNote, dashTitle }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTags, setInputTags] = useState("");

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
      }
      //  ADD NOTE
      else {
        const res = await axios.post(
          `${BASE_URL}/api/note/add-note`,
          { title, content, tags },
          { withCredentials: true },
        );
      }

      //  Refresh Notes After Add/Update
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

        <div className="flex flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="addTags"
            value={inputTags}
            onChange={(e) => setInputTags(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <button className="bg-sky-300 p-2 size-8" onClick={addClick}>
            +
          </button>
        </div>
        <ul className="flex flex-wrap  gap-2">
          {tags.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full shadow-sm border border-green-200 hover:shadow-md transition"
              >
                <p className="text-sm font-medium">{item}</p>
                <button
                  className=" size-5 items-center justify-center bg-green-300 hover:bg-red-400 hover:text-white transition text-xs font-bold rounded-full"
                  onClick={() => removeClick(index)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>

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
