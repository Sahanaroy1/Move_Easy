import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { GET_PROPERTIES } from '../utils/queries';
import '../styles/Properties.css';

const Properties = () => {
  const { loading, error, data } = useQuery(GET_PROPERTIES);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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
      return meetsMinPrice && meetsMaxPrice;
    });
    setFilteredProperties(filtered);
    setSelectedProperty(filtered[0]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="properties-container">
      <div className="properties-list">
        <div className="filter-container">
          <label>
            Min Price:
            <input 
              type="number" 
              value={minPrice} 
              onChange={(e) => setMinPrice(e.target.value)} 
            />
          </label>
          <label>
            Max Price:
            <input 
              type="number" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)} 
            />
          </label>
          <button onClick={handleFilter}>Filter</button>
        </div>
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <Link key={property._id} to={`/properties/${property._id}`} className="property-link">
              <div className="property-cards">
                <img src={property.images.length > 0 ? property.images[0] : 'placeholder.jpg'} alt={`Property`} className="property-images" />
                <strong>Address:</strong> {property.address}<br />
                <strong>Price:</strong> ${property.price}<br />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="map-container">
        {/* Include your map component here */}
      </div>
    </div>
  );
};

export default Properties;
