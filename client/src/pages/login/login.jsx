import React, { useState } from 'react';
import {login} from '../../api/authenticationApi';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash} from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState('false');

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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const res = await login(email, password);

            if (res.message === 'Email not verified') {
                localStorage.setItem('unverifiedEmail', email);
                navigate('/verify-otp');
                return;
            }
    
            const { token, user } = res;
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('accentColor', user.accentColor);
            localStorage.setItem('textColor', user.textColor);
            localStorage.setItem('font', user.font);
            navigate('/cvapp');
        } catch (err) {
            const message = err.response?.data?.message || 'Invalid Credentials.';
            setError(message);
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
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "password" : "text"}
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <div type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
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
