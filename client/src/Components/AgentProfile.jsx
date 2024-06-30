import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AGENT_PROPERTIES } from '../utils/queries';
import { ADD_PROPERTY } from '../utils/mutations';
import { Button, Modal, Form } from 'react-bootstrap';
import Auth from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgentDashboard = () => {
  const { loading, error, data, refetch } = useQuery(AGENT_PROPERTIES);
  const [addProperty] = useMutation(ADD_PROPERTY);
  const [showModal, setShowModal] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    price: '',
    description: '',
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
      await addProperty({
        variables: {
          email,
          address: propertyDetails.address,
          price: parseFloat(propertyDetails.price), // Convert price to float
          description: propertyDetails.description,
        },
      });
      refetch();

      setShowModal(false);
      setPropertyDetails({ address: '', price: '', description: '' }); // Reset form
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { agentProperties } = data;
  return (
    <div>
        
        <div className="property-list">
            <h1>Agent Dashboard</h1>
            <Button variant="primary" onClick={() => setShowModal(true)} className='button'>
            Add Property
            </Button>
            <h2>Your Properties:</h2>
            <div className="property-grid">
                {agentProperties.map(property => (
                <div key={property._id} className="property-card">
                    <img src={property.images} alt={`Property`} className="property-image" />
                    <div className="property-details">
                    <strong>Address:</strong> {property.address}<br />
                    <div className="additional-info">
                        <strong>Price:</strong> ${property.price}<br />
                        <strong>Description:</strong> {property.description}
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
     

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProperty}>
            Add Property
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AgentDashboard;
