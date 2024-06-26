import React from 'react';
import LoginForm from '../Components/LoginForm';
import mainImage from '../assets/main_background.jpeg';
import './Home.css';

const Login = () => {
  return (
    <div>
      <img src={mainImage} className="main-image"/>
      <LoginForm />
    </div>
  );
};

export default Login;