import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PROPERTIES } from '../utils/queries';
import Map from './Map';
import '../styles/Properties.css';
import { MdOutlineBedroomParent } from "react-icons/md";


const Properties = () => {
  const { loading, error, data } = useQuery(GET_PROPERTIES);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
        <button onClick={handleFilter}>Filter</button>
      </div>
      
      <div className="properties-container">
        <div className="properties-list">
          <div className="properties-grid">
            {filteredProperties.map(property => (
              <Link key={property._id} to={`/properties/${property._id}`} className="property-link">
                <div className="property-cards">
                  <img src={property.images.length > 0 ? property.images[0] : 'placeholder.jpg'} alt={`Property`} className="property-images" />
                  <strong>Address:</strong> {property.address}<br />
                  <strong>Price:</strong> ${property.price}<br />
                  <strong><MdOutlineBedroomParent/> </strong> {property.bedrooms}<br />
                  <strong>Property Type:</strong> {property.propertyType}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="map-container">
          <Map properties={filteredProperties} className="map-container"/>
        </div>
      </div>
    </div>
  );
};

export default Properties;
