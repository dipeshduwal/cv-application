import React, { useEffect, useState } from 'react';
import { getUserPreferences } from '../../api/resumePreferencesApi'; 
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../utils/logout';
import Modal from '../../components/modal/modal';
import './profileComponent.css'; 
import Navbar from '../../components/navigationBar/navigationBar';

const ProfileComponent = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const logout = useLogout();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserPreferences();
                setProfile(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    if (error) return <p className="error">{error}</p>;

    const templateDesign = profile?.isVertical ? '#2 Template Design' : '#1 Template Design';

    return (
        <div className="profile-container">
            <Navbar/>
            {profile && (
                <div className="profile-card">
                    <h2>User Profile</h2>
                    <p><strong>Your Username:</strong> {profile.username}</p>
                    <p><strong>Your Email:</strong> {profile.email}</p>
                    <p><strong>Color Preference:</strong> {profile.accentColor}</p>
                    <p><strong>Font Preference:</strong> {profile.font}</p>
                    <p><strong>Template Preference:</strong> {templateDesign}</p>
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
            <div className="footer-copy">
                <p>
                   Resume Builder {currentYear} &copy; Dipesh Duwal
                </p>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={logout} 
                title="Are you sure you want to logout?"
            />
        </div>
    );
};

export default ProfileComponent;
