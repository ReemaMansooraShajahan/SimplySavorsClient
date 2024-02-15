import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Search({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchTerm(value); // Set the searchTerm when input changes
    console.log('Search Term:', value); // Log the search term
  };

  const handleSearchClick = () => {
    // Handle search button click if needed
  };

  return (
    <div className='img-container'>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Search...'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className='btn' onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
