import React from 'react';
import '../styles/Footer.css';
import facebook from '../assets/images/facebook.png'; 
import insta from '../assets/images/insta.png';
import youtube from '../assets/images/youtube.png';
import tiktok from '../assets/images/tiktok.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={facebook}/>
        <img src={insta}/>
        <img src={youtube}/>
        <img src={tiktok}/>
        <p>@ MoveEasy2024</p>
      </div>
    </footer>
  );
};

export default Footer;
