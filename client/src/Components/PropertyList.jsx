import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Map from './Map'; 

const initialProperties = [
  { 
    id: 1, 
    name: 'Property 1', 
    description: 'Description of Property 1', 
    price: 250000, 
    area: 1200, 
    image: 'property1.jpg', 
    imageDescription: 'Image of Property 1',
    lat: 40.712776, 
    lng: -74.005974 
  },
  { 
    id: 2, 
    name: 'Property 2', 
    description: 'Description of Property 2', 
    price: 300000, 
    area: 1500, 
    image: 'property2.jpg', 
    imageDescription: 'Image of Property 2',
    lat: 34.052235, 
    lng: -118.243683 
  },
  // Add more properties as needed
];

const PropertyList = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState(initialProperties[0]); // Default selected property for map

  const handleSearch = (searchCriteria) => {
    const filteredProperties = initialProperties.filter(property => {
      const meetsPriceCriteria = (!searchCriteria.minPrice || property.price >= searchCriteria.minPrice) &&
                                (!searchCriteria.maxPrice || property.price <= searchCriteria.maxPrice);
      const meetsAreaCriteria = (!searchCriteria.minArea || property.area >= searchCriteria.minArea) &&
                               (!searchCriteria.maxArea || property.area <= searchCriteria.maxArea);
      return meetsPriceCriteria && meetsAreaCriteria;
    });

    setProperties(filteredProperties);
    setSelectedProperty(filteredProperties[0]); // Set the first filtered property as selected for map
  };

  return (
    <div className="property-list-container">
      <div className="property-list">
        <Search onSearch={handleSearch} />
        <h2>Properties</h2>
        <div className="property-container">
          {properties.map(property => (
            <div key={property.id} className="property" onClick={() => setSelectedProperty(property)}>
              <h3><Link to={`/properties/${property.id}`}>{property.name}</Link></h3>
              
              <p>{property.description}</p>
              <p>Price: ${property.price.toLocaleString()}</p>
              <p>Area: {property.area} sqft</p>
            </div>
          ))}
        </div>
      </div>
      <div className="map-container">
        <Map locations={[selectedProperty]} />
      </div>
    </div>
  );
};

export default PropertyList;
