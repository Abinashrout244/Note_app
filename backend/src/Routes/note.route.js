const express = require("express");
const noteRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { addNotes, editNote } = require("../controllers/note.controller");

noteRouter.post("/add-note", authMiddleware, addNotes);
noteRouter.put("/edit-note/:noteId", authMiddleware, editNote);
module.exports = noteRouter;
