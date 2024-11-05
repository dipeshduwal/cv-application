import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/login'
import Signup from './pages/signUp/signUp';
import HomePage from './pages/homePage/homePage';
import ProfileComponent from './pages/profileComponent/profileComponent';
import FAQ from './pages/faq/faq';
import Contact from './pages/contactUs/contactUs';
import CVApp from './pages/cvApp/cvApp';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import ResetPassword from './pages/resetPassword/resetPassword';
import VerifyOtp from './pages/emailVerification/emailVerification';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/faq" element={<FAQ/>}/>
          <Route path="/cvapp" element={<CVApp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp/>}/>
          <Route path="/contact" element={<Contact />} /> 

          {/* Redirect to homepage for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
