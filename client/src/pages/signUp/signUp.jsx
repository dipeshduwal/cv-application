import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const isEmailValid = email.trim() !== '' && /\S+@gmail\.com$/.test(email);
        const isPasswordValid = password.trim() !== '';
        setIsValid(isEmailValid && isPasswordValid);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateForm();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:5000/auth/signup', { username, email, password });
            setSuccessMessage('✔ OTP sent to your email. Please verify before login. Redirecting...');
            setTimeout(() => navigate('/verify-otp'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'The username or email exists already.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className='nav-link'>
            <Link to="/HomePage" className="nav-link1">Go To Homepage</Link>
            </div>      
            <h1>Create an Account</h1>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={handlePasswordChange}
                        pattern="(?=.*\d)(?=.*[A-Z]).{6,}"
                        title="Must contain at least one number, one uppercase, and at least 6 characters"
                        required

                    />
                </div>
                <button type="submit" disabled={loading || !isValid}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <p className="error-message">{error}</p>}
            <p className='login'>
                Already have an account?... <Link to="/Login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
