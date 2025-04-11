import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const token = localStorage.getItem("token"); // Check if a valid token exists
    return !!token; // If a token exists, set isAuthenticated to true
  });

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("token", token); // Save the JWT token
  };

  const handleSignup = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("token", token); // Save the JWT token
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Update authentication state
    localStorage.removeItem("isAuthenticated"); // Remove isAuthenticated flag
    localStorage.removeItem("token"); // Remove JWT token
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
      </Routes>
    </Router>
  );
};

export default App;