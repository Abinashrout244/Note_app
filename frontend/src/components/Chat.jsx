import { useState, useEffect, useRef } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateMessage, setActiveUser } from "../utils/ChatSlice";

const getUserChatKey = (user) => {
  if (!user) return "guest";
  return user._id || user.id || user.emailId || "guest";
};

export default function ChatBot() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const messages = useSelector((state) => state.chat.messages);
  const userChatKey = getUserChatKey(user);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(setActiveUser(userChatKey));
  }, [dispatch, userChatKey]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userId = Date.now();
    const botId = userId + 1;

    setInput("");
    setLoading(true);

    // Add user message
    dispatch(
      addMessage({
        id: userId,
        role: "user",
        text: userMessage,
      }),
    );

    // Add empty bot message (streaming)
    dispatch(
      addMessage({
        id: botId,
        role: "bot",
        text: "",
        streaming: true,
      }),
    );

    try {
      const response = await fetch(`${BASE_URL}/api/msg/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to fetch.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let botText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.startsWith("data: ")) continue;

          const payloadText = event.replace(/^data:\s*/, "");
          let payload;
          try {
            payload = JSON.parse(payloadText);
          } catch {
            continue;
          }

          if (payload.type === "token") {
            botText += payload.token;

            dispatch(
              updateMessage({
                id: botId,
                updates: {
                  text: botText,
                  streaming: true,
                },
              }),
            );
          }

          if (payload.type === "error") {
            throw new Error(payload.error || "Streaming failed.");
          }

          if (payload.type === "done") {
            dispatch(
              updateMessage({
                id: botId,
                updates: { streaming: false },
              }),
            );
          }
        }
      }
    } catch (err) {
      dispatch(
        updateMessage({
          id: botId,
          updates: {
            text: err.message || "Something went wrong.",
            streaming: false,
          },
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 bg-purple-600/20 rounded-xl">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
          </div>

          <div>
            <p className="text-lg font-bold tracking-wide">
              Chat<span className="text-purple-400">Bot</span>
            </p>
            <p className="text-xs text-gray-400">AI Assistant</p>
          </div>
        </div>

        <Link
          to="/"
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-purple-600/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </Link>
      </nav>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot Avatar */}
            {msg.role === "bot" && (
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold shadow-lg">
                AI
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`relative max-w-md px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-xl backdrop-blur-md transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-sm"
                  : "bg-white/10 text-gray-200 rounded-bl-sm border border-white/10"
              }`}
            >
              {msg.text || (msg.streaming ? "Typing..." : "")}

              {/* Small timestamp fake (optional design) */}
              <div className="text-[10px] text-gray-400 mt-1 text-right opacity-60">
                just now
              </div>
            </div>

            {/* User Avatar */}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold shadow-lg">
                You
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything..."
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              loading
                ? "bg-gray-700 text-gray-400"
                : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30"
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
