// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './resetPassword.css';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isValidOtp = (otp) => {
        const otpPattern = /^\d{6}$/;
        return otpPattern.test(otp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (!isValidOtp(otp)) {
            setError('Invalid OTP. Please enter a 6-digit number.');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/password/reset-password', {
                email,
                otp,
                newPassword,
            });
            setSuccessMessage('✔ Password reset successfully. Please log in.');
            setTimeout(() => navigate('/login'), 3000); // Redirect to Login page
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <p className="error-message">{error}</p>}
            <Link to="/login">Back to Login</Link>
        </div>
    );
}

export default ResetPassword;