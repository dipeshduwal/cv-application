import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './emailVerification.css';

function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/verification/verify-otp', { email, otp });
            alert('Email verified successfully! You can now log in.');
            navigate('/Login'); 
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="verify-otp-container">
            <h1>Verify Your Email</h1>
            <p className="verification-message">
                You must verify your OTP before you can log in.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="otp">OTP</label>
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
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default VerifyOtp;
