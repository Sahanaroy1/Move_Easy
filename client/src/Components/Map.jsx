import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Map = ({ properties }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 54.7023545, lng: -3.2765753 });

  useEffect(() => {
    // Set the map center based on the first property's location
    if (properties.length > 0) {
      const firstProperty = properties[0];
      setMapCenter({
        lat: firstProperty.latitude,
        lng: firstProperty.longitude,
      });
    }
  }, [properties]);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={mapCenter} zoom={5} style={mapStyles}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property, index) => (
          <Marker
            key={index}
            position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
          >
            <Popup>
              <div>
                <h2>{property.address}<br/>{property.postcode}</h2>
                <p>Price: ${property.price}</p>
                <Link to={`/properties/${property._id}`}>view details</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
