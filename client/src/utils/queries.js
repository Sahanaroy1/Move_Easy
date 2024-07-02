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
    bedrooms
    propertyType
    latitude
    longitude
    images

    }
  }
`;