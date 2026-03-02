import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NoteSlice from "./NoteSlice";
import ChatSlice from "./ChatSlice";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    note: NoteSlice,
    chat: ChatSlice,
  },
});

export default Store;
