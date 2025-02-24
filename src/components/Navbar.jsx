// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'; // Optional for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/"> MyApp</Link></div>
      <ul className="nav-links">
        <li><Link to="/account">My Account</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/tvshows">TV Shows</Link></li>
        <li className="login-icon">
          <Link to="/login">
            <img src="https://img.icons8.com/material-outlined/24/000000/user.png" alt="Login" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;