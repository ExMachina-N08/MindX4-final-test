import React, { useState } from "react";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Input, message } from "antd";
import axios from "axios";
import Logo from "./logo";
const Navbar = ({ isLoggedIn, setIsLoggedIn, setMovies }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search input visibility

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

  // Toggle search input visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
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
      <Logo />
      <div className="flex items-center">
        {/* Search Input */}
        {isSearchVisible && (
          <Input
            placeholder="Search movies"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ width: 200, marginRight: "10px" }} // Add margin for spacing
          />
        )}
        <SearchOutlined
          className="text-xl cursor-pointer ml-2"
          onClick={toggleSearch}
        />
      </div>
    </div>
  );
};

export default Navbar;
