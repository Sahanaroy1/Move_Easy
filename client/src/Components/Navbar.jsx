// Navigation.jsx
import React, { useState } from 'react';
import { Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Auth from '../utils/auth'; // Assuming Auth module handles authentication
import '../styles/Navbar.css';
import logo from '../assets/Move easy.png'; 

function Navigation() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [searchTerm, setSearchTerm] = useState('');

  const isLoggedIn = Auth.loggedIn();
  const userType = Auth.getUserType();

  const handleLogout = () => {
    Auth.logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <Nav className="navbar">
      <div className='navbar-logo'>
        <a href='/'><img src={logo} className="main-image" alt="Move Easy Logo"/></a>
        <a href='/'><h1>Move Easy</h1></a>
      </div>
          <Form onSubmit={handleSearch} className='search'>
            <FormControl
              type="text"
              name="search"
              placeholder="Search by city, postcode, or address"
              className="inputText"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-success" className='searchBtn'>Search</Button>
          </Form>
        
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
