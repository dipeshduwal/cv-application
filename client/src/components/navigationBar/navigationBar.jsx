import React from 'react';
import { Link } from 'react-router-dom';
import './navigationBar.css';

const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Resume Builder</h2>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/cvapp">Resume</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/faq">FAQ</Link>
                </li>
                <li>
                    <button className="logout-button2" onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
