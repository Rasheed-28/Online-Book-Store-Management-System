import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '/components/auth/Login'; 
import Register from '/components/auth/Register'; 
import ForgotPassword from '../components/auth/ForgotPassword';
import UserProfile from '../components/user/UserProfile';
import AddNewBook from '../components/books/AddNewBook';
import ManageBooks from '../components/books/ManageBooks';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/add_new_book" element={<AddNewBook />} />
        <Route path="/manage_books" element={<ManageBooks />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);