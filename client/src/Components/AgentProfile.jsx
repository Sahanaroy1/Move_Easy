import React from 'react';
import { useQuery } from '@apollo/client';
import { AGENT_PROPERTIES } from '../utils/queries'; 

const AgentDashboard = () => {
  const { loading, error, data } = useQuery(AGENT_PROPERTIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { agentProperties } = data;

  return (
    <div>
      <h1>Agent Dashboard</h1>
      <h2>Your Properties:</h2>
      <ul>
        {agentProperties.map(property => (
          <li key={property._id}>
            <strong>Address:</strong> {property.address}<br />
            <strong>Price:</strong> ${property.price}<br />
            <strong>Description:</strong> {property.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentDashboard;
