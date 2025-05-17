import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import BookDetail from './components/BookDetail';
import "./app.css";

// Fonction pour vérifier si l'utilisateur est admin
const isAdmin = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser?.role === 'admin';
};

// Route protégée pour l'admin
const ProtectedAdminRoute = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }
  return children;
};

// Initialisation du compte admin par défaut
const initializeAdmin = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (!users.some(user => user.role === 'admin')) {
    users.push({
      id: 'admin',
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@library.com',
      password: 'admin123',
      role: 'admin'
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
};

const App = () => {
  React.useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


