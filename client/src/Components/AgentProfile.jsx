import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AGENT_PROPERTIES } from '../utils/queries';
import { ADD_PROPERTY, DELETE_PROPERTY } from '../utils/mutations';
import getCoordinatesFromAddress from '../utils/geocode';
import { Button, Modal, Form } from 'react-bootstrap';
import Auth from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Agents.css';
import EditPropertyForm from './EditProperty';

const AgentDashboard = () => {
  const { loading, error, data, refetch } = useQuery(AGENT_PROPERTIES);
  const [addProperty] = useMutation(ADD_PROPERTY);
  const [deleteProperty] = useMutation(DELETE_PROPERTY);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    city: '',
    postcode: '',
    price: '',
    description: '',
    images: [], // Initialize images as an empty array
    bedrooms: '',
    propertyType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleAddProperty = async () => {
    try {
      const email = Auth.getUserEmail(); // Get email from AuthService
      const { address, city, postcode } = propertyDetails;

      // Fetch coordinates based on address
      const { lat, lon } = await getCoordinatesFromAddress(`${address}, ${city}, ${postcode}`);
      console.log(lat, lon);
      await addProperty({
        variables: {
          email,
          address,
          city,
          postcode,
          price: parseFloat(propertyDetails.price), // Convert price to float
          description: propertyDetails.description,
          images: propertyDetails.images, // Pass images array to mutation
          latitude: lat,
          longitude: lon,
          bedrooms: parseInt(propertyDetails.bedrooms), // Convert bedrooms to int
          propertyType: propertyDetails.propertyType,
        },
      });
      refetch();

      setShowAddModal(false);
      setPropertyDetails({ address: '', city: '', postcode: '', price: '', description: '', images: [], bedrooms: '', propertyType: '' }); // Reset form
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await deleteProperty({
        variables: { propertyId },
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { agentProperties } = data;
  console.log(agentProperties);

  return (
    <div>
      <div className="property-list">
        <h1>Agent Dashboard</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)} className='button'>
          Add Property
        </Button>
        <h2>Your Properties:</h2>
        <div className="property-grid">
          {agentProperties.map(property => (
            <div key={property._id} className="property-card">
              <img src={property.images.length > 0 ? property.images[0] : 'placeholder.jpg'} alt={`Property`} className="property-image" />
              <div className="property-details">
                <strong>Address:</strong> {property.address}, {property.city}, {property.postcode}<br />
                <div className="additional-info">
                  <strong>Price:</strong> ${property.price}<br />
                  <strong>Description:</strong> {property.description}<br />
                  <strong>Bedrooms:</strong> {property.bedrooms}<br />
                  <strong>Type:</strong> {property.propertyType}
                </div>
                <Button variant="secondary" className='button' onClick={()  => {
                  setPropertyToEdit(property);
                  setShowEditModal(true);
                }}>
                  Edit
                </Button>
                <Button variant="danger" className='delete' onClick={() => handleDeleteProperty(property._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title'>Add Property</Modal.Title>
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
          <Button variant="secondary"  onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" className='submit-button' onClick={handleAddProperty}>
            Add Property
          </Button>
        </Modal.Footer>
      </Modal>

      {propertyToEdit && (
        <EditPropertyForm
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          property={propertyToEdit}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AgentDashboard;
