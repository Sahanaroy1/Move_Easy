import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap for form styling
import { LOGIN_USER } from '../utils/mutations'; // Assuming you have a LOGIN_USER query defined
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth'; 
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.error('Error logging in:', error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          email: formData.email,
          password: formData.password
        },
      });

      // Optionally, you can redirect or handle login success here

      // Clear form fields after successful login
      setFormData({
        email: '',
        password: ''
      });
      const { token, user } = data.login;

      Auth.login(token);

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="formEmail">Email address</label>
        <input
          type="email"
          id="formEmail"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="formPassword">Password</label>
        <input
          type="password"
          id="formPassword"
          name="password"
          className="form-control"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <Button variant="primary" type="submit" className="btn btn-primary">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
