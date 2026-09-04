const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const DBConnection = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
  }),
);

// Routes
const authRouter = require("./Routes/auth.route");
const noteRouter = require("./Routes/note.route");
const chatRouter = require("./Routes/chat.route");
const { postRouter } = require("./Routes/post.route");

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.use("/api/msg", chatRouter);
app.use("/api/community", postRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "NoteFlow Backend is running 🚀",
  });
});

const PORT = process.env.PORT || 3000;

DBConnection()
  .then(() => {
    console.log("DB connection establish Perfectly");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server Connection Establish Perfectly on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
