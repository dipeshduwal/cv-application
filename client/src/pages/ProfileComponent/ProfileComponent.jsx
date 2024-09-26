import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileComponent.css';  // Import CSS

const ProfileComponent = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setProfile(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
                localStorage.removeItem('token');  // Clear token if unauthorized
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear the token
        navigate('/HomePage'); 
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            {profile && (
                <div className="profile-card">
                    <h2>User Profile</h2>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;
