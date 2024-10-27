import React, { useState } from 'react';
import {signup} from '../../api/authenticationApi';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState('false');
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signup(username, email, password );
            localStorage.setItem('unverifiedEmail', email);
            setSuccessMessage('✔ OTP sent to your email. Please verify before login. Redirecting...');
            setError('');
            setTimeout(() => navigate('/verify-otp'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'The username or email exists already.');
            setSuccessMessage('');
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
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "password" : "text"} // Toggle between text and password
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={handlePasswordChange}
                            pattern="(?=.*\d)(?=.*[A-Z]).{6,}"
                            title="Must contain at least one number, one uppercase, and at least 6 characters"
                            required
                        />
                        <div type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Icon for password visibility */}
                        </div>
                    </div>
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
