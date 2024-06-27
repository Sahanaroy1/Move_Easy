import { gql } from '@apollo/client';


export const AGENT_PROPERTIES = gql`
  query AgentProperties {
    agentProperties {
      _id
      address
      price
      description
    }
  }
`;