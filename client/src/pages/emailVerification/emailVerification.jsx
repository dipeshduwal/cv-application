import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './emailVerification.css';

function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Load the email from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem('unverifiedEmail');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/verification/verify-otp', { email, otp });
            setSuccessMessage('✔ Email verified successfully! You can now log in. Redirecting....');
            setTimeout(() => navigate('/login'), 2000); 
        } catch (err) {
            setError(err.response?.data?.message || 'The OTP does not match with send OTP.');
        }
    };

    return (
        <div className="verify-otp-container">
            <div className='nav-link'>
            <Link to="/HomePage" className="nav-link1">Go To Homepage</Link>
            </div>  
            <h1>Verify Your Email</h1>
            <p className="verification-message">
                You must verify your OTP before you login.
            </p>
            <form onSubmit={handleSubmit}>
                <p className='email-text'>Email: {email}</p>
                <div className="input-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        placeholder="Enter the OTP sent to your email"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Verify OTP</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default VerifyOtp;
