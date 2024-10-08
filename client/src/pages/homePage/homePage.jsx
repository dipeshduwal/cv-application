// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

function HomePage() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <div className="homepage-container">
      <h1>Welcome to the Resume Builder</h1>
      <p>
        Build your professional resume quickly and efficiently. Whether you're a seasoned professional or just starting. 
        Start by <b>signing up</b> or <b>logging in</b>.
      </p>
      
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Easy Login to Preserve Your CV</li>
          <li>Real-time Previews</li>
          <li>Easy PDF Export Options</li>
          
        </ul>
      </div>

      <div className="nav-links">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button">Signup</Link>
      </div>

      <footer>
        <div className="footer-content">
          <div className="about-section">
            <h4>About Resume Builder</h4>
            <p>This Resume Builder is a tool designed to simplify the process of creating professional resumes, ensuring great first impression.</p>
          </div>

          <div className="social-links">
            <p>Connect with us:</p>
            <a href="https://github.com/dipeshduwal" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/dipeshduwal" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
          {currentYear} &copy; Dipesh Duwal
           
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
