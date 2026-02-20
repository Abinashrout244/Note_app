const { default: mongoose } = require("mongoose");
const { noteModel } = require("../models/notes.model");

const addNotes = async (req, res) => {
  try {
    const logedinUser = req.getUser;
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Feild Cant't be Empty" });
    }
    const data = await noteModel.create({
      title,
      content,
      tags,
      userId: logedinUser._id,
    });

    res.json({ sucess: true, message: "Adding Note Successfully", data });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

const editNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "invalid NoteId" });
    }

    const updateNote = await noteModel.findByIdAndUpdate(noteId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updateNote) {
      return res.status(404).json({ message: "Note not exist" });
    }

    res.status(200).json({ updateNote });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const logedinUser = req.getUser;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "invalid NoteId" });
    }
    const data = await noteModel.findByIdAndDelete({
      _id: noteId,
      userId: logedinUser,
    });
    res.json({ message: "Delete sucessfully", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllNotes = async (req, res) => {
  try {
    const logedinUser = req.getUser;

    const data = await noteModel.find({ userId: logedinUser });

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { addNotes, editNote, deleteNote, getAllNotes };
