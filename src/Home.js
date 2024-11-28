// src/Home.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Home.css'; // We will add styles for the home component here

const Home = () => {
  const location = useLocation(); // To get the current route location
  const navigate = useNavigate(); // To programmatically navigate the user

  const handleLogout = () => {
    // Clear any session or authentication information
    localStorage.removeItem('authToken'); // Assuming you store auth token in localStorage
    // Redirect to the login page
    navigate('/login');
  };

  // Check if the current route is neither login nor signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <header className="home-header">
        <div className="home-title">
          <h1>Employee Management App</h1>
        </div>
        {/* Show logout button only on pages other than login and signup */}
        {!isAuthPage && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
    </div>
  );
};

export default Home;
