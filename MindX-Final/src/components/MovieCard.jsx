import React from "react";

const MovieCard = ({ image, name, time, year, introduce, onClick }) => {
  return (
    <div
      className="w-44 p-2 shadow-md rounded-lg flex-shrink-0 bg-white text-center cursor-pointer"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="h-64 w-full object-cover rounded-lg"
      />
      <h3 className="font-semibold mt-2 text-lg">{name}</h3>
      <p className="text-gray-600">
        {time} mins | {year}
      </p>
    </div>
  );
};

export default MovieCard;
