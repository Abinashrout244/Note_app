const { noteModel } = require("../models/notes.model");

const addNotes = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Feild Cant't be Empty" });
    }
    const data = await noteModel.create({
      title,
      content,
      tags,
    });

    res.json({ sucess: true, message: "Adding Note Successfully", data });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

const editNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const updateNote = await noteModel.findByIdAndUpdate(noteId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateNote) {
      return res.status(404).json({ message: "Note not exist" });
    }

    res.json({ updateNote });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

module.exports = { addNotes, editNote };
