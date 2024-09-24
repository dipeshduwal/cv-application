// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Welcome to the Resume Builder</h1>
      <p>Create professional resumes with ease. Get started by <b>signing up</b> or <b>logging in</b>.</p>
      <div className="nav-links">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button">Signup</Link>
        
      </div>
      <footer>&copy; 2024 Resume Builder. All rights reserved.</footer>
    </div>
  );
}

export default HomePage;

