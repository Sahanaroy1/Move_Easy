import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PROPERTIES } from '../utils/queries';
import Map from './Map';
import '../styles/Properties.css';
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TOGGLE_SAVE_PROPERTY } from '../utils/mutations';
import Auth from '../utils/auth'; // Assuming Auth module handles authentication

const Properties = () => {
  const { loading, error, data } = useQuery(GET_PROPERTIES);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const isLoggedIn = Auth.loggedIn();
  const userType = Auth.getUserType();

  const [toggleSaveProperty] = useMutation(TOGGLE_SAVE_PROPERTY, {
    onError: (error) => {
      console.error('Error toggling save property:', error);
    },
    update: (cache, { data: { toggleSaveProperty: updatedProperty } }) => {
      // Update the cached properties list after toggling save status
      const updatedProperties = data.properties.map(property =>
        property._id === updatedProperty._id ? updatedProperty : property
      );
      setFilteredProperties(updatedProperties);
      setSelectedProperty(updatedProperty);
    },
  });

  useEffect(() => {
    if (data) {
      setFilteredProperties(data.properties);
      setSelectedProperty(data.properties[0]);
    }
  }, [data]);

  const handleFilter = () => {
    const filtered = data.properties.filter(property => {
      const meetsMinPrice = minPrice ? property.price >= parseFloat(minPrice) : true;
      const meetsMaxPrice = maxPrice ? property.price <= parseFloat(maxPrice) : true;
      const meetsBedrooms = bedrooms ? property.bedrooms === parseInt(bedrooms) : true;
      const meetsPropertyType = propertyType ? property.propertyType === propertyType : true;
      return meetsMinPrice && meetsMaxPrice && meetsBedrooms && meetsPropertyType;
    });
    setFilteredProperties(filtered);
    setSelectedProperty(filtered[0]);
  };

  const toggleSave = (propertyId) => {
    toggleSaveProperty({
      variables: { propertyId },
    });
    // Update savedProperties state for UI purposes (optimistic update)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Properties</h1>
      <div className="filter-container">
        <div className="filter-item">
          <label>Min Price:</label>
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)} 
          />
        </div>
        <div className="filter-item">
          <label>Max Price:</label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
          />
        </div>
        <div className="filter-item">
          <label>Bedrooms:</label>
          <input 
            type="number" 
            value={bedrooms} 
            onChange={(e) => setBedrooms(e.target.value)} 
          />
        </div>
        <div className="filter-item">
          <label>Property Type:</label>
          <select 
            value={propertyType} 
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Detached">Detached</option>
            <option value="Semi-Detached">Semi-Detached</option>
            <option value="Terraced">Terraced</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Flat">Flat</option>
          </select>
        </div>
        <button onClick={handleFilter} className='filter'>Filter</button>
      </div>
      
      <div className="properties-container">
        {/* Properties list */}
        <div className="properties-list">
          <div className="properties-grid">
            {filteredProperties.map(property => (
              <div key={property._id} className="property-card">
                <Link to={`/properties/${property._id}`} className="property-link">
                  <img src={property.images.length > 0 ? property.images[0] : 'placeholder.jpg'} alt={`Property`} className="property-image" />
                  <strong>Address:</strong> {property.address}<br />
                  <strong>Price:</strong> ${property.price}<br />
                  <strong><MdOutlineBedroomParent/></strong> {property.bedrooms}<br />
                  <strong>Property Type:</strong> {property.propertyType}
                </Link>
                {isLoggedIn && userType === 'CUSTOMER' && ( // Render heart icon only for customers
                  property.saved ? (
                    <FaHeart onClick={() => toggleSave(property._id)} className="Heart saved" />
                  ) : (
                    <FaRegHeart onClick={() => toggleSave(property._id)} className="Heart" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Map component */}
        <div className="map-container">
          <Map properties={filteredProperties} />
        </div>
      </div>
    </div>
  );
};

export default Properties;
