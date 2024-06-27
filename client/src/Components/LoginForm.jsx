import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Auth from '../utils/auth'; // Assuming Auth module handles authentication

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loggedIn = await Auth.login(email, password);
      if (loggedIn) {
        history.push('/'); // Redirect to home page or another page after login
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
    <h1>Login</h1>
    <div className="form-group">
      <label htmlFor="formEmail">Email address</label>
      <input
        type="email"
        id="formEmail"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="formPassword">Password</label>
      <input
        type="password"
        id="formPassword"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button type="submit" className="btn btn-primary">
      Login
    </button>
  </form>
);
}

export default LoginForm;
