// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './forgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleRequestOtp = async () => {
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:5000/auth/requestPasswordReset', { email });
            alert('OTP sent to your email. Please check your inbox.');
            navigate('/reset-password'); // Redirect to Reset Password page
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password?</h1>
            <p>Enter your email to receive an OTP.</p>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <button onClick={handleRequestOtp} disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
            </button>
            {error && <p className="error-message">{error}</p>}
            <Link to="/login">Back to Login</Link>
        </div>
    );
}

export default ForgotPassword;
