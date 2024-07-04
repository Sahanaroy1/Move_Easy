import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROPERTY_BY_ID } from '../utils/queries';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/PropertyDetail.module.css';
import Map from '../Components/PropertyMap'
const PropertyDetails = () => {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(GET_PROPERTY_BY_ID, {
    variables: { propertyId },
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { property } = data;
  const totalImages = property.images.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  return (
    <div>
      <Container className={styles.propertyDetails}>
        <Row>
          <Col md={8} className={styles.col}>
            <div className={styles.imageContainer}>
            <div className={styles.imageCount}>
                {currentImageIndex + 1}/{totalImages}
              </div>
              <img
                src={property.images[currentImageIndex] || 'placeholder.jpg'}
                alt="Property"
                className={styles.propertyImage}
              />
           {property.images.length > 1 && (
                <Button variant="secondary" onClick={nextImage} className={styles.nextButton}>
                  Next Image
                </Button>
              )}
              
            </div>
           
                   
           
            <div className={styles.propertyInfo}>
              <h3>
                {property.address}, {property.city}, {property.postcode}
              </h3>
              <p>{property.description}</p>
              <div className={styles.propertyFeatures}>
                <p>
                  <strong>Price:</strong> ${property.price}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <strong>Property Type:</strong> {property.propertyType}
                </p>
              </div>
            </div>
            
          </Col>
          <Col md={4}>
            <div className={styles.contactSection}>
              <h4>Contact Agent</h4>
              <p>
                For more information or to schedule a viewing, please contact the agent.
              </p>
              <h4>Agent Email : {property.agent.email}</h4>
            </div>
            <div className={styles.mapContainer}>
              <Map properties={property} className="map-container"/>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PropertyDetails;
