import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap for form styling
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth'; 

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    type: 'Customer', // Default type, can be changed in the form
  });

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        console.error('GraphQL Error:', error.graphQLErrors);
      }
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          type: formData.type,
        },
      });


      // Clear form fields after successful sign-up
      setFormData({
        username: '',
        email: '',
        password: '',
        type: 'Customer',
      });
      const { token, user } = data.addUser;
      Auth.login(token);
    } catch (error) {
      console.error('Error signing up:', error);
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
          name="username" // Ensure name attribute matches state key
          className="form-control"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="formEmail">Email address</label>
        <input
          type="email"
          id="formEmail"
          name="email" // Ensure name attribute matches state key
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
          name="password" // Ensure name attribute matches state key
          className="form-control"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="formType">User Type</label>
        <select
          id="formType"
          name="type" // Ensure name attribute matches state key
          className="form-control"
          value={formData.type}
          onChange={handleChange}
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
