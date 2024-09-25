const cloudinary = require("../config/cloudinary");
const Movie = require("../models/movie");

// Create a new movie
exports.uploadMovie = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "movies",
    });

    // Create new movie document
    const newMovie = new Movie({
      ID: req.body.ID,
      name: req.body.name,
      time: req.body.time,
      year: req.body.year,
      image: result.secure_url,
      introduce: req.body.introduce,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie uploaded successfully", newMovie });
  } catch (error) {
    console.error("Error uploading to Cloudinary or MongoDB:", error);
    res.status(500).json({ error: "Failed to upload movie" });
  }
};

// Read all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Read a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
};

// Update a movie (full replacement) using PUT
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    // Check if a file is provided and upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "movies",
      });
      updatedData.image = result.secure_url; // Use Cloudinary URL for image
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure data follows schema rules
      overwrite: true, // Overwrite entire document
    });

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: "Movie updated successfully", updatedMovie });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Failed to update movie" });
  }
};

// Partially update a movie using PATCH
exports.patchMovie = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    // Check if a file is provided and upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "movies",
      });
      updatedData.image = result.secure_url; // Update image field
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure data follows schema rules
    });

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: "Movie partially updated successfully", updatedMovie });
  } catch (error) {
    console.error("Error partially updating movie:", error);
    res.status(500).json({ error: "Failed to partially update movie" });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the movie document
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};

// Search movies by keyword
exports.searchMovies = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // Get the search keyword from query parameters

    // Log the keyword for debugging
    console.log("Search keyword:", keyword);

    // Create a case-insensitive regex pattern for the keyword
    const regex = new RegExp(keyword, "i");

    // Search for movies where the name or introduce fields contain the keyword
    const movies = await Movie.find({
      $or: [
        { name: { $regex: regex } }, // Search in the name field
        { introduce: { $regex: regex } }, // Search in the introduce field
      ],
    });

    // Check if any movies were found
    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found matching the keyword." });
    }

    // Log the found movies
    console.log("Found movies:", movies);

    // Send the found movies as response
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Failed to search movies" });
  }
};