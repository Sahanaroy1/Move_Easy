import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');

  const handleSearch = () => {
    // Convert inputs to numbers
    const minPriceNum = parseInt(minPrice);
    const maxPriceNum = parseInt(maxPrice);
    const minAreaNum = parseInt(minArea);
    const maxAreaNum = parseInt(maxArea);

    // Validate inputs
    if (Number.isNaN(minPriceNum) || Number.isNaN(maxPriceNum) || Number.isNaN(minAreaNum) || Number.isNaN(maxAreaNum)) {
      alert('Please enter valid numbers for price and area.');
      return;
    }

    // Pass search criteria to parent component
    onSearch({
      minPrice: minPriceNum,
      maxPrice: maxPriceNum,
      minArea: minAreaNum,
      maxArea: maxAreaNum,
    });
  };

  return (
    <div>
      <h2>Search Properties</h2>
      <div>
        <label>Min Price:</label>
        <input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <label>Max Price:</label>
        <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <div>
        <label>Min Area:</label>
        <input type="text" value={minArea} onChange={(e) => setMinArea(e.target.value)} />
        <label>Max Area:</label>
        <input type="text" value={maxArea} onChange={(e) => setMaxArea(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
