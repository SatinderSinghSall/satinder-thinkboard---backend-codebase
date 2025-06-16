import Note from "../models/Note.js";

//! Function to get all Notes from the Database:
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(`❌ Error while fetching data from database: ${error}`);
    res.status(500).json({
      message:
        "❌ Internal Server Error: Error while fetching data from database.",
    });
  }
};

//! Function to get a specific Note:
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    // FIXME : Getting ISE instead of 404 NF
    if (!note) {
      return res
        .status(404)
        .json({ message: "Invalid: Note id, note not found." });
    }
    res.status(200).json({ message: "Found Note Successfully!", note });
  } catch (error) {
    console.error(`❌ Error while fetching the note from database: ${error}`);
    res.status(500).json({
      message:
        "❌ Internal Server Error: Error while fetching the note from database.",
    });
  }
};

//! Function to create a new Note:
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });
    await note.save();
    res.status(201).json({ message: "Post Created Successfully!", note });
  } catch (error) {
    console.error(`❌ Error while creating a note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Error while creating a note.",
    });
  }
};

//! Function to update the Note:
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    // FIXME : Getting ISE instead of 404 NF
    if (!updatedNote) {
      return res.status(404).json({ message: "Invalid: Note not found." });
    }
    res.status(200).json({ message: "Post Updated Successfully!", updateNote });
  } catch (error) {
    console.error(`❌ Error while updating a note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Error while updating a note.",
    });
  }
};

//! Function to delete a Note:
export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) {
      return res.status(404).json({ message: "Invalid: Note not found." });
    }
    res.status(200).json({ message: "Post Deleted Successfully!" });
  } catch (error) {
    console.error(`❌ Error while deleting a note: ${error}`);
    res.status(500).json({
      message: "❌ Internal Server Error: Error while deleting a note.",
    });
  }
};
