import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './profileComponent.css'; 
import Modal from '../../components/modal/modal';  

const ProfileComponent = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }
    
            try {
                const res = await axios.get(`http://localhost:5000/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProfile(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear the token
        navigate('/HomePage'); 
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            <div className='nav-link'>
            <Link to="/cvapp" className="nav-link2">Go To Resume Builder</Link>
            </div> 
            {profile && (
                <div className="profile-card">
                    <h2>User Profile</h2>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <button className="logout-button" onClick={() => setIsModalOpen(true)}>
                        Logout
                    </button>
                </div>
            )}
            <div className="profile-tips">
                        <h3>Quick Tips:</h3>
                        <p>Here are some tips to help you get the most out of our resume builder:</p>
                        <ul>
                            <li>Use action verbs to describe your work experience for a more impactful resume.</li>
                            <li>Keep your resume concise — one page is ideal for most industries.</li>
                            <li>Tailor your resume for each job application to increase your chances.</li>
                        </ul>
            </div>
            <div className="profile-footer">
                <p>You are using the Resume Builder. We hope you're having a great experience!</p>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleLogout} 
            />
        </div>
    );
};

export default ProfileComponent;
