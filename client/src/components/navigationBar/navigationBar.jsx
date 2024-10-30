import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import './navigationBar.css';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/HomePage'); 
    };
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Resume Builder</h2>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/cvapp">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/faq">FAQ</Link>
                </li>
                <li>
                    <button className="logout-button2" onClick={() => setIsModalOpen(true)}>
                        Logout
                    </button>
                </li>
            </ul>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
                title="Are you sure you want to logout?"
            />
        </nav>
    );
};

export default Navbar;
