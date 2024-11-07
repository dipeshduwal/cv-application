import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Login from './pages/login/login';
import Signup from './pages/signUp/signUp';
import HomePage from './pages/homePage/homePage';
import ProfileComponent from './pages/profileComponent/profileComponent';
import FAQ from './pages/faq/faq';
import Contact from './pages/contactUs/contactUs';
import CVApp from './pages/cvApp/cvApp';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import ResetPassword from './pages/resetPassword/resetPassword';
import VerifyOtp from './pages/emailVerification/emailVerification';
import { ThemeContext, ThemeProvider } from './contexts/themeContext/themeContext';
import './styles/app.css';

function App() {
  return (
    <ThemeProvider> {/* ThemeProvider should wrap the whole app */}
      <AppContent /> {/* AppContent will now use the context */}
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='App'>
      {/* Theme toggle button */}
      <div onClick={toggleTheme} className="theme-toggle-btn">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </div>

      {/* Routing setup */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cvapp" element={<CVApp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/contact" element={<Contact />} />

          {/* Redirect to homepage for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
