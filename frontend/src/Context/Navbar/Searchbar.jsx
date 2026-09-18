// src/components/Search.jsx
import React, { useState } from 'react';
import './Search.css'; // Import your CSS file here

function Search() {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(prevState => !prevState);
  };

  return (
    <div className="nav-search">
      <button id="search-icon" onClick={toggleSearch}>
        <i className="fas fa-search"></i>
      </button>
      <input
        type="text"
        id="search-bar"
        className={isSearchVisible ? 'active' : ''}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
