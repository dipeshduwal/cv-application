// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Welcome to the Resume Builder</h1>
      <p>Select an option to get started:</p>
      <div className="nav-links">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button">Signup</Link>
        <Link to="/cvapp" className="nav-button">Start Building Resume</Link>
      </div>
    </div>
  );
}

export default HomePage;
