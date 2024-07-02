import React from 'react';
import '../styles/Footer.css';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className='links'>
          <p className='smLink'><FaInstagram/></p>
          <p className='smLink'><FaYoutube/></p>        
          <p className='smLink'><FaTiktok/></p>
          <p className='smLink'><FaFacebook/></p>
        </div>
        <p>@ MoveEasy2024</p>
      </div>
    </footer>
  );
};

export default Footer;
