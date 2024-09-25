import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <h1 className="text-2xl font-bold text-black">
        MOVIE <span className="text-orange-500"></span>
      </h1>
      <div className="ml-1 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
        UI
      </div>
    </div>
  );
};

export default Logo;
