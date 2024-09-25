import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import { Modal } from "antd";
import axios from "axios";
import "./App.css"; // Import your CSS file

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Fetch movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/movies");
        setMovies(response.data); // Set the fetched movies data
      } catch (error) {
        console.error("Error fetching movies from the database:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleMovieAction = () => {
    if (isLoggedIn) {
      alert("Movie action triggered!");
    }
  };

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const response = await axios.get(
        `http://localhost:/api/movies/search?keyword=${query}`
      );
      if (response.data) {
        setMovies(response.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  // Function to open modal with selected movie details
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-orange-300 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full">
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleMovieAction={handleMovieAction}
          onSearch={handleSearch}
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Most Popular Movies</h1>
          <div className="flex space-x-6 overflow-x-auto py-4">
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  {...movie}
                  onClick={() => openModal(movie)}
                />
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal to display movie details */}
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
        centered
        className="custom-modal" // Apply custom modal class
      >
        <MovieDetail movie={selectedMovie} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default App;
