import mongoose from "mongoose";

//! Schema of the Database:
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    noteBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//! Model of Schema:
const Note = mongoose.model("Note", noteSchema);
export default Note;
