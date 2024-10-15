import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();

    //Disable login until validation is passed
    const validateForm = () => {
        const isEmailValid = email.trim() !== '' && /\S+@\S+\.\S+/.test(email);
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
            const res = await axios.post('http://localhost:5000/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/cvapp');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {     
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className='nav-link'>
            <Link to="/HomePage" className="nav-link1">Go To Homepage</Link>
            </div>      
            <h1>Welcome Back!</h1>
            <h2>Please Login</h2>
            <form onSubmit={handleSubmit}>
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading || !isValid}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className='forgot-password'>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p className='signup'>
                Don't have an account?...<Link to="/Signup"> Sign up</Link>
            </p>
            
        </div>
    );
}

export default Login;
