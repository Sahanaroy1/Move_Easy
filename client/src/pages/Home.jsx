import React from 'react';
import mainImage from '../assets/main_background.jpeg';
import './Home.css';

const Home = () => {
  return (
    <div>
      <img src={mainImage} className="main-image"/>
    </div>
  );
};

export default Home;
