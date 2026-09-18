import React from 'react';
import './ProductSection.css';
import { Link } from 'react-router-dom';

const ProductSection = ({ isActive, onClose }) => {
  if (!isActive) return null;

  const menuItems = [
    { name: 'Portraits', path: '/Portraits' },
    { name: 'Keychains', path: '/Keychains' }, 
    { name: 'Polaroids', path: '/Polaroids'},
    { name: 'Bookmark', path: '/Bookmark'},
    { name: 'Purse', path: '/Purse' } 
  ];

  return (
    <div className="ProductSection popup-menu">
      <h2>Product</h2>
      
      <ul className="product-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} onClick={onClose}>
              {item.name}
              {item.isNew && <span className="new-tag">New</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSection;