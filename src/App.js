import React from "react";
import Navbar from "./components/Navbar"; // Correct path for Navbar
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // For routing
import Home from "./pages/Home"; // Ensure Home is exported correctly
import AboutUs from "./pages/AboutUs"; // Ensure AboutUs is exported correctly

import ConnectUs from "./pages/ConnectUs"; // Import ConnectUs page

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar at the top */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home page */}
        <Route path="/aboutus" element={<AboutUs />} /> {/* Route for About Us */}
        <Route path="/connect-us" element={<ConnectUs />} /> {/* Route for Connect Us */}
      </Routes>
    </Router>
  );
}

export default App;
