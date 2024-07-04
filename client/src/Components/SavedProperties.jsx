import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_SAVED_PROPERTIES } from '../utils/queries';
import Map from './Map';
import '../styles/Properties.css';
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TOGGLE_SAVE_PROPERTY } from '../utils/mutations';

const SavedProperties = () => {
  const { loading, error, data, refetch} = useQuery(GET_SAVED_PROPERTIES);
  const [savedProperties, setSavedProperties] = useState([]);
  const [toggleSaveProperty] = useMutation(TOGGLE_SAVE_PROPERTY, {
    onError: (error) => {
      console.error('Error toggling save property:', error);
    },
    update: (cache, { data: { toggleSaveProperty: updatedProperty } }) => {
      // Update the cached properties list after toggling save status
      const updatedProperties = savedProperties.map(property =>
        property._id === updatedProperty._id ? updatedProperty : property
      ).filter(property => property.saved); // Filter out unsaved properties
      setSavedProperties(updatedProperties);
    },
  });

  useEffect(() => {
    if (data) {
      setSavedProperties(data.savedProperties);
    }
  }, [data]);

  const toggleSave = (propertyId) => {
    toggleSaveProperty({
      variables: { propertyId },
    });
  }
  refetch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Saved Properties</h1>
      <div className="properties-container">
        {/* Properties list */}
        <div className="properties-list">
          <div className="properties-grid">
            {savedProperties.map(property => (
              <div key={property._id} className="property-card">
                <Link to={`/properties/${property._id}`} className="property-link">
                  <img src={property.images && property.images.length > 0 ? property.images[0] : 'placeholder.jpg'} alt={`Property`} className="property-image" />
                  <strong>Address:</strong> {property.address}<br />
                  <strong>Price:</strong> ${property.price}<br />
                  <strong><MdOutlineBedroomParent/></strong> {property.bedrooms}<br />
                  <strong>Property Type:</strong> {property.propertyType}
                </Link>
                {property.saved ? (
                  <FaHeart onClick={() => toggleSave(property._id)} className="Heart saved" />
                ) : (
                  <FaRegHeart onClick={() => toggleSave(property._id)} className="Heart" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Map component */}
        <div className="map-container">
          <Map properties={savedProperties} />
        </div>
      </div>
    </div>
  );
};

export default SavedProperties;
