import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../utils/logout';
import Modal from '../modal/modal';
import logoutIcon from '../../assets/logout-button.png';
import './navigationBar.css';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const logout = useLogout();

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
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <button className="logout-button2" onClick={() => setIsModalOpen(true)}>
                    <img src={logoutIcon} alt="Logout" className="logout-icon" />
                    </button>
                </li>
            </ul>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={logout}
                title="Are you sure you want to logout?"
            />
        </nav>
    );
};

export default Navbar;
