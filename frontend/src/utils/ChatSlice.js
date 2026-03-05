import { createSlice } from "@reduxjs/toolkit";

const CHAT_STORAGE_KEY = "chat_history_by_user";
const LEGACY_STORAGE_KEY = "chat_history";
const DEFAULT_USER_KEY = "guest";

const resolveUserKey = (userKey) => userKey || DEFAULT_USER_KEY;

/* Load all chats from localStorage */
const loadAllChats = () => {
  try {
    const data = localStorage.getItem(CHAT_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed && typeof parsed === "object" ? parsed : {};
    }

    // Migrate old single-chat storage to the default user key.
    const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyData) {
      const parsedLegacy = JSON.parse(legacyData);
      return Array.isArray(parsedLegacy)
        ? { [DEFAULT_USER_KEY]: parsedLegacy }
        : {};
    }

    return {};
  } catch {
    return {};
  }
};

/* Save all chats to localStorage */
const saveAllChats = (messagesByUser) => {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messagesByUser));
};

const initialMessagesByUser = loadAllChats();
const initialUserKey = DEFAULT_USER_KEY;

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeUserKey: initialUserKey,
    messagesByUser: initialMessagesByUser,
    messages: initialMessagesByUser[initialUserKey] || [],
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUserKey = resolveUserKey(action.payload);
      state.messages = state.messagesByUser[state.activeUserKey] || [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.messagesByUser[state.activeUserKey] = state.messages;
      saveAllChats(state.messagesByUser);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      state.messagesByUser[state.activeUserKey] = state.messages;
      saveAllChats(state.messagesByUser);
    },
    updateMessage: (state, action) => {
      const { id, updates } = action.payload;
      state.messages = state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg,
      );
      state.messagesByUser[state.activeUserKey] = state.messages;
      saveAllChats(state.messagesByUser);
    },
    clearChat: (state) => {
      state.messages = [];
      state.messagesByUser[state.activeUserKey] = [];
      saveAllChats(state.messagesByUser);
    },
  },
});

export const { setActiveUser, setMessages, addMessage, updateMessage, clearChat } =
  chatSlice.actions;

export default chatSlice.reducer;
