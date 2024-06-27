import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'; // Assuming Auth module handles authentication
import './Navbar.css'; 
 
function Navigation() {

  return (
    <Nav className="navbar">
      <div className="logo-container">
        <h1>Move Easy</h1>
      </div>
      <ul className="nav-links-right">
        <li className="nav-item">
          <Nav.Link as={Link} to='/properties' className="nav-link">Properties</Nav.Link>
        </li>
        {Auth.loggedIn() ? (
          <li className="nav-item">
            <Nav.Link onClick={Auth.logout} className="nav-link">Logout</Nav.Link>
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
