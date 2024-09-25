import React from "react";

const MovieDetail = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="custom-modal-body flex p-4 bg-white rounded-lg shadow-lg">
      {/* Movie Poster */}
      <div className="movie-poster w-1/3 mr-4">
        <img
          src={movie.image}
          alt={movie.name}
          className="rounded-lg shadow-md w-full object-cover"
        />
      </div>

      {/* Movie Info */}
      <div className="movie-info w-2/3 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-2">{movie.name}</h2>
        <p className="text-gray-500 text-sm mb-2">
          {movie.time} min | {movie.year}
        </p>
        <p className="text-gray-700 mb-6">{movie.introduce}</p>
        <button
          className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition duration-200"
          onClick={onClose}
        >
          Play Movie
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
