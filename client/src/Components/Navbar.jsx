import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'; // Assuming Auth module handles authentication
import './Navbar.css'; 
import logo from '../assets/Logo.png'; 


function Navigation() {
  const isLoggedIn = Auth.loggedIn();
  console.log(isLoggedIn);
  const handleLogout = () => {
    Auth.logout();
  };
  return (
    <Nav className="navbar">
      <div className="logo-container">
        <h1>Move Easy</h1>
        <img src={logo} className="logo"/>

      </div>
      <ul className="nav-links-right">
        <li className="nav-item">
          <Nav.Link as={Link} to='/properties' className="nav-link">Properties</Nav.Link>
        </li>
        {isLoggedIn ? (
          <li className="nav-item">
            <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
          </li>
        ) : (
          <>
          
            <li className="nav-item">
              <Nav.Link as={Link} to='/login' className="nav-link">Login</Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link as={Link} to='/signup' className="nav-link">Sign Up</Nav.Link>
            </li>
          </>
        )}
      </ul>
    </Nav>
  );
}

export default Navigation;
