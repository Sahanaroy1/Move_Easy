import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap for form styling
import Auth from '../utils/auth'; // Assuming Auth module handles authentication

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Customer'); // Default type is Customer

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform sign up logic, e.g., using Auth.signUp(username, email, password, type)
      const user = await Auth.signUp(username, email, password, type);
      if (user) {
        history.push('/'); // Redirect to home page or another page after successful sign-up
      } else {
        alert('Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="formUsername">Username</label>
        <input
          type="text"
          id="formUsername"
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

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

      <div className="form-group">
        <label htmlFor="formType">User Type</label>
        <select
          id="formType"
          className="form-control"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="Customer">Customer</option>
          <option value="Agent">Agent</option>
        </select>
      </div>

      <Button variant="primary" type="submit" className="btn btn-primary">
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUpForm;
