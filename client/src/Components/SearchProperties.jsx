// SearchResults.jsx

import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { SEARCH_PROPERTIES } from '../utils/queries'; // Assuming you have this query defined
import  '../styles/Search.css'
const SearchResults = () => {
  const { searchTerm } = useParams(); // Get searchTerm from URL parameters
  const { loading, error, data } = useQuery(SEARCH_PROPERTIES, {
    variables: { searchTerm },
    skip: !searchTerm, // Skip query execution if searchTerm is empty
  });

  if (loading) return <p className="search-loading">Loading...</p>;
  if (error) return <p className="search-error">Error: {error.message}</p>;

  // Ensure data.searchProperties is defined before mapping over it
  const properties = data.searchProperties || [];

  return (
    <div className="search-results">
      <h1 className="search-results-title">Search Results</h1>
      <div className="search-properties-container">
        <div className="search-properties-list">
          <div className="search-properties-grid">
            {properties.map(property => (
                <Link to={`/properties/${property._id}`} className="property-link">
              <div key={property._id} className="search-property-card">
                <h2 className="search-property-address">{property.address}</h2>
                <p className="search-property-price">Price: ${property.price}</p>

              </div>
               </Link>

            ))}
          </div>
        </div>
        {/* Optionally, include a map component for search results */}
      </div>
    </div>
  );
};

export default SearchResults;
