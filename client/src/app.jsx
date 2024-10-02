import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/login'
import Signup from './pages/signUp/signUp';
import HomePage from './pages/homePage/homePage';
import ProfileComponent from './pages/profileComponent/profileComponent';
import CVApp from './pages/cvApp/cvApp';

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
