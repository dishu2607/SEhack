import React from "react";
import Navbar from "./components/Navbar"; // Correct path for Navbar
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // For routing
import Home from "./pages/Home"; // Ensure Home is exported correctly
import AboutUs from "./pages/AboutUs"; // Ensure AboutUs is exported correctly
import ProfilePage from "./pages/ProfilePage";
import ConnectUs from "./pages/ConnectUs"; // Import ConnectUs page

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />             {/* Home Page route */}
        <Route path="/aboutus" element={<AboutUs />} />   {/* About Us Page route */}
        <Route path="/connect-us" element={<ConnectUs />} /> {/* Connect Us Page route */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page route */}
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
