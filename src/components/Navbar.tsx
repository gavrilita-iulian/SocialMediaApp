// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "../design/Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchUsername, setSearchUsername] = useState("");

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = () => {
    const value = searchUsername.trim();
    if (!value) return;

    navigate(`/profile/${value}`);
    setSearchUsername("");
  };

  return (
    <header className="navbar">
      {/* stanga */}
      <div className="navbar-left" />

      {/* mijloc */}
      <div className="navbar-center">
        <Link
          to="/"
          className={`nav-button nav-main ${
            isActive("/") || isActive("/Explore-Page") ? "active" : ""
          }`}
        >
          Explore Page
        </Link>

        <Link
          to="/create-post"
          className={`nav-button nav-main ${
            isActive("/create-post") ? "active" : ""
          }`}
        >
          Create Post
        </Link>

        <Link
          to="/my-profile"
          className={`nav-button nav-main ${
            isActive("/my-profile") ? "active" : ""
          }`}
        >
          My Profile
        </Link>

        {/* 🔍 SEARCH USER */}
       {/* 🔍 SEARCH USER */}
<div className="navbar-search">
  <input
    type="text"
    placeholder="Search user..."
    value={searchUsername}
    onChange={(e) => setSearchUsername(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSearch();
    }}
    className="nav-button navbar-search-input"
  />

  <button
    onClick={handleSearch}
    className="nav-button"
  >
    Search
  </button>
</div>

      </div>

      {/* dreapta */}
      <div className="navbar-right">
        <Link
          to="/register"
          className={`nav-button ${isActive("/register") ? "active" : ""}`}
        >
          Register
        </Link>

        <Link
          to="/login"
          className={`nav-button ${isActive("/login") ? "active" : ""}`}
        >
          Login
        </Link>

        <LogoutButton className="nav-button" />
      </div>
    </header>
  );
};

export default Navbar;
