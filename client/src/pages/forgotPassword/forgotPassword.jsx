import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './forgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');  // Clear error when user starts typing
        setSuccessMessage('');  // Clear success message
    };

    const handleRequestOtp = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await axios.post('http://localhost:5000/password/forgot-password', { email });
            setSuccessMessage('✔ OTP sent to your email. Please check your inbox. Redirecting....');
            setTimeout(() => navigate('/reset-password'), 1000); // Redirect after 2 seconds
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid Email Provided.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password?</h1>
            <p>If you've forgotten your password, enter your email below to receive an OTP to reset it.</p>

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

            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <p className="error-message">{error}</p>}

            <div className="back-to-login">
                <p>Remember your password?</p>
                <Link to="/login" className="login-link-button">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
