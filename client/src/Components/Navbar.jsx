import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'; // Assuming Auth module handles authentication
import '../styles/Navbar.css';
import logo from '../assets/Move easy.png'; 


function Navigation() {
  const isLoggedIn = Auth.loggedIn();
  const userType = Auth.getUserType() ;
 console.log(userType);
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <Nav className="navbar">
      <div className='navbar-logo'>
      <a href='/'><img src={logo} className="main-image"/></a>
      <a href='/'><h1>Move Easy</h1></a>

      </div>
    
      <ul className="nav-links-right">
        <li className="nav-item">
          <Nav.Link as={Link} to='/properties' className="nav-link">Properties</Nav.Link>
        </li>
        {isLoggedIn ? (
          <>
            {userType === 'AGENT' && (
              <li className="nav-item">
                <Nav.Link as={Link} to='/agents' className="nav-link">Agents Dashboard</Nav.Link>
              </li>
            )}
            {userType === 'CUSTOMER' && (
              <li className="nav-item">
                <Nav.Link as={Link} to='/saved' className="nav-link">Saved Properties</Nav.Link>
              </li>
            )}
            <li className="nav-item">
              <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
            </li>
          </>
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
