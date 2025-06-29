import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '/components/auth/Login'; // Adjust path as needed
import Register from '/components/auth/Register'; // Adjust path as needed
import ForgotPassword from '../components/auth/ForgotPassword';
import UserProfile from '../components/user/UserProfile';
import AdminDashboard from '../components/dashboard/AdminDashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);