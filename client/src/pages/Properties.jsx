import React from 'react';
import PropertyList from '../Components/PropertyList';

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
    
  ];
  

const Properties = () => {
  return (
    <div>
      <PropertyList />
    </div>
  );
};

export default Properties;
