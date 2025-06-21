import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//! Route to view all Notes (optional: make this protected)
router.get("/", protect, getAllNotes);

//! Route to view a specific Note
router.get("/:id", protect, getNoteById);

//! Route to create a Note (protected)
router.post("/", protect, createNote);

//! Route to update a Note (protected)
router.put("/:id", protect, updateNote);

//! Route to delete a Note (protected)
router.delete("/:id", protect, deleteNote);

export default router;
