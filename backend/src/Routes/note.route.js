const express = require("express");
const noteRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  addNotes,
  editNote,
  deleteNote,
  getAllNotes,
} = require("../controllers/note.controller");

noteRouter.post("/add-note", authMiddleware, addNotes);
noteRouter.put("/edit-note/:noteId", authMiddleware, editNote);
noteRouter.delete("/delete-note/:noteId", authMiddleware, deleteNote);
noteRouter.get("/all-note", authMiddleware, getAllNotes);
module.exports = noteRouter;
