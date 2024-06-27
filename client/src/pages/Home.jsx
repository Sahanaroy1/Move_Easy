
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';

//import { Typography, Container, Card, CardContent, CardMedia, Button, CardActionArea, CardActions, Grid } from "@mui/material";

const images = [photo1, photo2, photo3]

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-main">
        <section className="welcomeText" >Welcome to Move Easy, where move is easy and homes are happy!</section>
        <div className="homepageContainer">
          <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} style={{ marginTop: "2%" }} className="hero-image" />
        </div>
     
    </section>
  );
};

export default Home;
