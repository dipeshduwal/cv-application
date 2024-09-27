import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import HomePage from './pages/Homepage/Homepage';
import ProfileComponent from './pages/ProfileComponent/ProfileComponent';
import CVApp from './pages/Cvapp/Cvapp';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/cvapp" element={<CVApp />} />

          {/* Redirect to homepage for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
