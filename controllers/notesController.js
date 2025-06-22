import mongoose from "mongoose";
import Note from "../models/Note.js";

//! Get all notes
export const getAllNotes = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found." });
    }

    const notes = await Note.find({ noteBy: req.user._id })
      .populate("noteBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error(`❌ Error while fetching notes: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Could not fetch notes.",
    });
  }
};

//! Get a specific note by ID
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID format." });
    }

    const note = await Note.findById(id).populate("noteBy", "name email");

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note retrieved successfully!", note });
  } catch (error) {
    console.error(`❌ Error while fetching the note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Could not fetch the note.",
    });
  }
};

//! Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found." });
    }

    const note = new Note({
      title,
      content,
      noteBy: req.user._id,
    });

    await note.save();
    res.status(201).json({ message: "Note created successfully!", note });
  } catch (error) {
    console.error(`❌ Error while creating note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Could not create note.",
    });
  }
};

//! Update an existing note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID format." });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully!", updatedNote });
  } catch (error) {
    console.error(`❌ Error while updating note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Could not update note.",
    });
  }
};

//! Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID format." });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error(`❌ Error while deleting note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Could not delete note.",
    });
  }
};
