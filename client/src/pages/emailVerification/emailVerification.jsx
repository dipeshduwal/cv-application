import React, { useState, useEffect } from 'react';
import {verifyOtp, resendOtp} from '../../api/emailVerificationApi';
import { Link, useNavigate } from 'react-router-dom';
import './emailVerification.css';

function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('unverifiedEmail');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(email, otp);
            setSuccessMessage('✔ Email verified successfully! You can now log in. Redirecting....');
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'The OTP does not match with send OTP.');
            setSuccessMessage('');
        }
    };

    const handleResendOtp = async () => {
        try {
            await resendOtp(email);
            setResendMessage('✔ OTP has been resent to your email. Please check your inbox.');
            setSuccessMessage('');
            setError('');
            setTimeout(() => setResendMessage(''), 4000);
        } catch (err) {
            setError('❌ Unable to resend OTP. Please try again later.');
        }
    };

    return (
        <div className="verify-otp-container">
            <div className='nav-link'>
                <Link to="/HomePage" className="nav-link1">Go To Homepage</Link>
            </div>
            <h1>Verify Your Email</h1>
            <p className="verification-message">
                You must verify your OTP before you login. An OTP has been sent to your mail.
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
                <div className="resend-otp-button">
                    <p> Did not get an otp? ⇒ </p>
                    <button onClick={handleResendOtp}>Resend OTP</button>
                </div>
            </form>
            {resendMessage && <div className="resend-message">{resendMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <p className="error-message">{error}</p>}

            <div className="help-section">
                <h3>Having Trouble?</h3>
                <p>If you did not receive the OTP, check your spam or junk folder. You can also click the <strong>Resend OTP</strong> button above.</p>
            </div>
        </div>
    );
}

export default VerifyOtp;
