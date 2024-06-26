import React from 'react';
import { useParams } from 'react-router-dom';
import Map from './Map';

const properties = [
    { id: 1, name: 'Property 1', description: 'Description of Property 1', price: 250000, area: 1200, lat: 40.712776, lng: -74.005974 },
    { id: 2, name: 'Property 2', description: 'Description of Property 2', price: 300000, area: 1500, lat: 34.052235, lng: -118.243683 },
    
  ];
  

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));

  return (
    <div>
      <h2>{property.name}</h2>
      <p>{property.description}</p>
      <Map locations={[property]} />
    </div>
  );
};

export default PropertyDetail;
