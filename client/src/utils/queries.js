import { gql } from '@apollo/client';


export const AGENT_PROPERTIES = gql`
  query AgentProperties {
    agentProperties {
      _id
      address
      city
      postcode
      price
      description
      images
      bedrooms
    propertyType
    }
  }
`;
export const GET_PROPERTIES = gql`
  query GetProperties {
    properties {
      _id
    address
    city
    postcode
    price
    description
    bedrooms
    propertyType
    latitude
    longitude
    images
    saved
    }
  }
`;
export const GET_PROPERTY_BY_ID = gql`
  query getProperty($propertyId: ID!) {
    property(propertyId: $propertyId) {
      _id
      address
      city
      postcode
      price
      description
      latitude
    longitude
      images
      bedrooms
      propertyType

    }
  }
`;

export const GET_SAVED_PROPERTIES = gql`
  query GetSavedProperties {
    savedProperties {
      _id
      address
      city
      postcode
      price
      description
      bedrooms
      propertyType
      latitude
      longitude
      images
      saved
    }
  }
`;