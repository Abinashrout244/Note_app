import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { deleteNote } from "../utils/NoteSlice";

export default function NoteCard({ note, modal }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        BASE_URL + "/api/note/delete-note/" + note._id,
        { withCredentials: true },
      );
      dispatch(deleteNote(note?._id));
      console.log(res);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition">
      <h3 className="font-semibold text-lg">{note.title}</h3>
      <p className="text-gray-600 mt-2">{note.content}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={modal}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
      <p className="text-slate-400 text-sm pt-2 text-end">{note.createdAt}</p>
    </div>
  );
}
