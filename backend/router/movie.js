const express = require("express");
const {
  uploadMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  patchMovie,
  deleteMovie,
  searchMovies,
} = require("../controllers/uploadMovie");
const upload = require("../config/multer");

const router = express.Router();

// Search movies by keyword (must come before /:id)
router.get("/search", searchMovies);

// Create a new movie
router.post("/upload", upload.single("file"), uploadMovie);

// Get all movies
router.get("/", getAllMovies);

// Get a single movie by ID (must come after /search)
router.get("/:id", getMovieById);

// Update a movie by ID (full replacement)
router.put("/:id", upload.single("file"), updateMovie);

// Partially update a movie by ID
router.patch("/:id", upload.single("file"), patchMovie);

// Delete a movie by ID
router.delete("/:id", deleteMovie);

module.exports = router;
