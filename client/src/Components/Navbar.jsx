import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png'; 
import './Navbar.css'; 

const Navbar = () => {
  
  return (
    <nav className="navbar">
      <ul className="nav-links-left">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
      </ul>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        
      </div>
      
      
      <ul className="nav-links-right">
        <li className="nav-item"><Link to="/properties" className="nav-link">Properties</Link></li>
      </ul>
      <ul className="nav-links-left">
        <li className="nav-item"><Link to="/login" className="nav-link">LogIn</Link></li>
      </ul>
      <ul className="nav-links-left">
        <li className="nav-item"><Link to="/login" className="nav-link">SignUp</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
