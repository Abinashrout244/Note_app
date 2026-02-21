import React, { useContext, useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import { Plus, FileText, Activity, Menu, X, SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { setNotes } from "../utils/NoteSlice";
import { ThemeContext } from "../utils/ThemeContext";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashTitle, setDashTitle] = useState("Add Notes");

  const { filteredNotes, theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const fetch_Notes = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/note/all-note", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(setNotes(res?.data?.data));
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    fetch_Notes();
  }, []);

  const notes = useSelector((state) => state.note.data);

  // Open for adding
  const openAddModal = () => {
    setEditNote(null);
    setDashTitle("Add Note");
    setOpenModal(true);
  };

  // Open for editing
  const openEditModal = (note) => {
    setEditNote(note);
    setDashTitle("Edit Note");
    setOpenModal(true);
  };

  // Close modal
  const closeModal = () => {
    setOpenModal(false);
    setEditNote(null);
  };

  return (
    <div
      className={`${theme === "Light" ? "bg-linear-to-br from-gray-100 to-indigo-50 " : "bg-slate-800"} min-h-screen`}
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-20 left-4 z-40 bg-white p-2 rounded-lg shadow"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <div
        className={`${theme === "Light" ? "bg-white/80" : "bg-slate-800"} fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 md:w-1/5  backdrop-blur-xl border-r border-gray-200 shadow-xl p-6 transition-transform duration-300 z-40
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h2>

        <div
          className={`${theme === "Light" ? "bg-white/80" : "bg-slate-900"} rounded-2xl p-5 shadow-md mb-6 border`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FileText className="text-indigo-600" size={20} />
            </div>
            <p className="text-gray-500 text-sm font-semibold">Total Notes</p>
          </div>
          <p className="text-4xl font-bold text-indigo-600">{notes?.length}</p>
        </div>

        <div
          className={`${theme === "Light" ? "bg-white/80" : "bg-slate-900"} rounded-2xl p-5 shadow-md border `}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Activity className="text-purple-600" size={20} />
            </div>
            <p className="text-gray-500 font-semibold text-sm">Activity</p>
          </div>
          <p
            className={`${theme == "Light" ? "text-gray-700" : "text-gray-400"} text-sm  font-semibold`}
          >
            Manage and organize notes efficiently.
          </p>
        </div>
      </div>

      <div className="pt-24 p-6 md:ml-[20%]">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
            <FileText size={50} className="mb-4 opacity-50" />
            <p className="text-lg">
              No notes yet. Click the + button to create one.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                modal={() => openEditModal(note)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => openAddModal()}
        className="fixed bottom-8 right-8 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-2xl hover:scale-110 transition"
      >
        <Plus size={26} />
      </button>

      {openModal && (
        <NoteModal
          close={() => closeModal()}
          dashTitle={dashTitle}
          editNote={editNote}
        />
      )}
    </div>
  );
}
