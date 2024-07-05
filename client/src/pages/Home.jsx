import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../utils/queries';
import '../styles/Home.css';
import { MdOutlineBedroomParent } from "react-icons/md";

const Home = () => {
  const { loading, error, data } = useQuery(GET_PROPERTIES);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { properties } = data;
  const displayedProperties = properties.slice(0, 3);
  console.log(properties);
  return (
    <section className="home-main">
      <section className="welcomeText">
        <h1>Making Moves Effortless and Homes Happy</h1>
        <p>
          Welcome to Move Easy, your partner in making moves effortless and homes truly happy. Whether you're a first-time buyer, seasoned investor, or looking to rent, our comprehensive platform connects you with properties that match your lifestyle and preferences. Begin your search now and embark on a journey to find the perfect place to call your own.
        </p>
      </section>
      
    
      <section className="featuredProperties">
        <h2>Featured Properties</h2>
        {displayedProperties.map(property => (
          <div key={property._id} className="featuredProperty-container">
            <div className="featuredProperty-details">
              <div className="featuredProperty-info">
                <h3 className="featuredProperty-address">{property.address}</h3>
                <p className="featuredProperty-price">${property.price}</p>
                <p className="featuredProperty-description">{property.description}</p>
                <p><strong><MdOutlineBedroomParent/> </strong> {property.bedrooms}<br /></p>
                <Link key={property._id} to={`/properties/${property._id}`} className="property-link">
                <button className='featuredProperty-button'>View Property</button>
                </Link>

              </div>
            </div>
            <img src={property.images.length > 0 ? property.images[0] : 'placeholder.jpg'} alt={`Property`} className="featuredProperty-image" />
          </div>
        ))}
      </section>
      <section className="features">
        <h2>Why Choose Move Easy</h2>
        <div className="features-content">
          <div className="feature">
            <h3>Comprehensive Property Listings</h3>
            <p>Explore a wide range of properties tailored to your needs, from cozy apartments to spacious family homes.</p>
          </div>
          <div className="feature">
            <h3>Expert Agents</h3>
            <p>Connect with experienced agents who are dedicated to helping you find your dream home or investment property.</p>
          </div>
          <div className="feature">
            <h3>User-Friendly Experience</h3>
            <p>Navigate our intuitive platform with ease and find the information you need quickly.</p>
          </div>
          <div className="feature">
            <h3>Saved Searches and Notifications</h3>
            <p>Save your favorite searches and get notified when new properties matching your criteria become available.</p>
          </div>
          <div className="feature">
            <h3>Interactive Property Map</h3>
            <p>Visualize property locations and explore neighborhoods using our integrated map feature.</p>
          </div>
          <div className="feature">
            <h3>Property Search Bar</h3>
            <p>Find your ideal property quickly and easily with our intuitive search bar, filtering by location, price, and property type.</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
