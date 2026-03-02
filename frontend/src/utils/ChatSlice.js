import { createSlice } from "@reduxjs/toolkit";

/* Load from localStorage */
const loadMessages = () => {
  try {
    const data = localStorage.getItem("chat_history");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/* Save to localStorage */
const saveMessages = (messages) => {
  localStorage.setItem("chat_history", JSON.stringify(messages));
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: loadMessages(),
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      saveMessages(state.messages);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      saveMessages(state.messages);
    },
    updateMessage: (state, action) => {
      const { id, updates } = action.payload;
      state.messages = state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg,
      );
      saveMessages(state.messages);
    },
    clearChat: (state) => {
      state.messages = [];
      localStorage.removeItem("chat_history");
    },
  },
});

export const { setMessages, addMessage, updateMessage, clearChat } =
  chatSlice.actions;

export default chatSlice.reducer;
