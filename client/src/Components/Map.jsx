import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ locations }) => {
  const mapStyles = {
    height: '100%',
    width: '100%',
  };

  const defaultCenter = {
    lat: locations[0].lat,
    lng: locations[0].lng,
  };

  return (
    <LoadScript googleMapsApiKey="https://maps.googleapis.com/maps/api/js?key=XXXXXXXXXX">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
