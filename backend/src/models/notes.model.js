const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "This field must Be Required"],
      minLength: [3, "Length must be greater Than 3"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "This field must Be Required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const noteModel = mongoose.model("Note", noteSchema);

module.exports = { noteModel };
