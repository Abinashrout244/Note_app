import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NoteSlice from "./NoteSlice";

const NoteStore = configureStore({
  reducer: {
    user: UserSlice,
    note: NoteSlice,
  },
});

export default NoteStore;
