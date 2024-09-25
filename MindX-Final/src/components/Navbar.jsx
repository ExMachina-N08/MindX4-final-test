import React, { useState } from "react";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Input, message } from "antd";
import axios from "axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn, setMovies }) => {
  const [searchValue, setSearchValue] = useState("");

  // Handle login/logout functionality
  const handleLogin = async () => {
    if (isLoggedIn) {
      // Handle logout
      setIsLoggedIn(false);
      message.success("Logged out successfully");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/login",
          {
            username: "testuser", // Replace with actual username input
            password: "password", // Replace with actual password input
          }
        );
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setIsLoggedIn(true);
          message.success("Logged in successfully");
        } else {
          message.error("Login failed");
        }
      } catch (error) {
        message.error("Login failed: " + error.message);
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle movie search
  const handleSearchClick = async () => {
    if (searchValue.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/movies/search?keyword=${searchValue}`
        );
        setMovies(response.data.movies); // Assuming 'movies' is the key in the response data
      } catch (error) {
        message.error("Failed to fetch movies: " + error.message);
      }
    }
  };

  // Menu items for Dropdown
  const menuItems = [
    {
      key: "1",
      label: (
        <span onClick={handleLogin}>{isLoggedIn ? "Logout" : "Login"}</span>
      ),
    },
  ];

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-t-lg shadow-md">
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <MenuOutlined className="text-xl cursor-pointer" />
      </Dropdown>
      <h1 className="text-2xl font-bold">
        MOVIE <span className="text-orange-500">UI</span>
      </h1>
      <div className="flex items-center">
        <Input
          placeholder="Search movies"
          value={searchValue}
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <SearchOutlined
          className="text-xl cursor-pointer ml-2"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
