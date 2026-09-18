import React from 'react';
import './Sidebar.css'; 
import { Link } from 'react-router-dom';

const Sidebar = ({ isActive, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <ul className="product-list">
        <li><Link to='../pages/Portraits'>Portrait</Link></li>
        <li><Link to='../pages/ResinArt'>Resin Art</Link></li>
        <li><Link to='../pages/Bookmark'>Bookmark</Link></li>
        <li><Link to='../pages/Keychains'>Keychain</Link></li>
        <li><Link to='../pages/Polaroids'>Polaroid</Link></li>
        <li><Link to='../pages/LippanArt'>Lippan Art</Link></li>
        <li><Link to='../pages/FridgeMagnet'>Fridge Magnets</Link></li>
        <li><Link to='../pages/Paintings'>Paintings</Link></li>
        <li><Link to='../pages/Purse'>Purse</Link></li>
        <li><Link to='../pages/WallHanging'>Wall Hanging</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
