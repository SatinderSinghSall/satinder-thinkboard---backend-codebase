import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

//! Route to view all the Notes:
router.get("/", getAllNotes);

//! Route to view a specific Note:
router.get("/:id", getNoteById);

//! Route to create a Note:
router.post("/", createNote);

//! Route to update a Note:
router.put("/:id", updateNote);

//! Route to delete a Note:
router.delete("/:id", deleteNote);

export default router;
