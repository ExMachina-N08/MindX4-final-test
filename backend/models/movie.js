const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    name: { type: String, required: true },
    time: { type: Number },
    year: { type: Number },
    image: { type: String },
    introduce: { type: String },
  },
  { timestamps: true }
);

// Creating the Movie model from the schema
const Movie = mongoose.model("Movie", movieSchema);

// Exporting the Movie model
module.exports = Movie;
