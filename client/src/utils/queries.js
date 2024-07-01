import { gql } from '@apollo/client';


export const AGENT_PROPERTIES = gql`
  query AgentProperties {
    agentProperties {
      _id
      address
      price
      description
      images
    }
  }
`;
export const GET_PROPERTIES = gql`
  query GetProperties {
    properties {
      _id
      address
      price
      images
      
    }
  }
`;