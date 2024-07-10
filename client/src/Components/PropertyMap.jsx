import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const PropertyMap = ({ properties }) => {
  const [mapCenter, setMapCenter] = useState({ lat: parseFloat(properties.latitude) , lng: parseFloat(properties.longitude)});

  useEffect(() => {
    if (properties) {
      setMapCenter({
        lat: parseFloat(properties.latitude),
        lng: parseFloat(properties.longitude),
      });
    }

  }, [properties]);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={mapCenter} zoom={15} style={mapStyles}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties && (
          <Marker position={[parseFloat(properties.latitude), parseFloat(properties.longitude)]}>
            <Popup>
              <div>
                <h2>{properties.address}<br/>{properties.postcode}</h2>
                <p>Price: ${properties.price}</p>
                {/* Add more property details as needed */}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
