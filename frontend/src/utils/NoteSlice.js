import { createSlice } from "@reduxjs/toolkit";

const NoteSlice = createSlice({
  name: "note",
  initialState: {
    data: [],
  },
  reducers: {
    // When fetching all notes from API
    setNotes: (state, action) => {
      state.data = action.payload;
    },

    // When creating a new note
    addNote: (state, action) => {
      state.data.push(action.payload);
    },

    // When deleting a note
    deleteNote: (state, action) => {
      state.data = state.data.filter((note) => note._id !== action.payload);
    },
  },
});

export const { setNotes, addNote, deleteNote } = NoteSlice.actions;
export default NoteSlice.reducer;
