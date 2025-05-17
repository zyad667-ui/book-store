import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Navbar from './layouts/navbar';
import ErrorPage from './pages/error/ErrorPage';

const App = () => {
  return (
    <>

      <Navbar />
      
      
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

    </>
  );
};

export default App;
