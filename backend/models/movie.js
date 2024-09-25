const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    name: { type: String, required: true },
    time: { type: Number }, // Duration in minutes
    year: { type: Number }, // Year of release
    image: { type: String }, // URL for the movie poster or image
    introduce: { type: String }, // Short introduction or description
  },
  { timestamps: true } // Enable automatic `createdAt` and `updatedAt` fields
);

// Creating the Movie model from the schema
const Movie = mongoose.model("Movie", movieSchema);

// Exporting the Movie model
module.exports = Movie;
