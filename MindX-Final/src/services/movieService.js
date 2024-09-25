import axios from "axios";

// Base URL for the backend API
const BASE_URL = "http://localhost:8080/api/movies";

// Fetch all movies
export const getAllMovies = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Fetch a single movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};

// Search movies by keyword
export const searchMovies = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
