import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import ExplorePage from "./pages/ExplorePage";
import Navbar from "./components/Navbar";
import MyProfilePage from "./pages/MyProfilePage";
import EditMyProfilePage from "./pages/EditMyProfile";
import OtherProfilePage from "./pages/OtherProfilePage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/Explore-Page" element={<ExplorePage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/edit-profile" element={<EditMyProfilePage />} />
        <Route path="/profile/:username" element={<OtherProfilePage />} /> 
        
      </Routes>
    </Router>
  );
};

export default App;
