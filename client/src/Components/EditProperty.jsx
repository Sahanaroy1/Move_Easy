import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_PROPERTY } from '../utils/mutations';
import getCoordinatesFromAddress from '../utils/geocode';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPropertyForm = ({ show, handleClose, property, refetch }) => {
  const [editProperty] = useMutation(EDIT_PROPERTY);
  const [propertyDetails, setPropertyDetails] = useState({
    address: property.address,
    city: property.city,
    postcode: property.postcode,
    price: property.price,
    description: property.description,
    images: property.images,
    bedrooms: property.bedrooms,
    propertyType: property.propertyType,
  });

  useEffect(() => {
    setPropertyDetails({
      address: property.address,
      city: property.city,
      postcode: property.postcode,
      price: property.price,
      description: property.description,
      images: property.images,
      bedrooms: property.bedrooms,
      propertyType: property.propertyType,
    });
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleEditProperty = async () => {
    try {
      const { address, city, postcode } = propertyDetails;
      const { lat, lon } = await getCoordinatesFromAddress(`${address}, ${city}, ${postcode}`);
      await editProperty({
        variables: {
          propertyId: property._id,
          address,
          city,
          postcode,
          price: parseFloat(propertyDetails.price),
          description: propertyDetails.description,
          images: propertyDetails.images,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          bedrooms: parseInt(propertyDetails.bedrooms),
          propertyType: propertyDetails.propertyType,
        },
      });
      refetch();
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={propertyDetails.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={propertyDetails.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPostcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type="text"
              name="postcode"
              value={propertyDetails.postcode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={propertyDetails.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={propertyDetails.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImages">
            <Form.Label>Images (URLs, separated by commas)</Form.Label>
            <Form.Control
              type="text"
              name="images"
              value={propertyDetails.images.join(',')}
              onChange={(e) => setPropertyDetails({ ...propertyDetails, images: e.target.value.split(',') })}
            />
          </Form.Group>
          <Form.Group controlId="formBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedrooms"
              value={propertyDetails.bedrooms}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPropertyType">
            <Form.Label>Property Type</Form.Label>
            <Form.Control
              as="select"
              name="propertyType"
              value={propertyDetails.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="Detached">Detached</option>
              <option value="Semi-Detached">Semi-Detached</option>
              <option value="Terraced">Terraced</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Flat">Flat</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditProperty} className='submit-button'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPropertyForm;
