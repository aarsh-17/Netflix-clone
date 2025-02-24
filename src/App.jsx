import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';
import Account from './components/Account';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import Login from './components/login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;