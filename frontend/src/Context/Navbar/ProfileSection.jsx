import React from 'react';
import './ProfileSection.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProfileSection = ({ isActive, onClose }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!isActive) return null;

  const menuItems = [
    { name: 'My Orders', path: '/cart' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Contact Us', path: '/about' },
    { name: 'Notifications', path: '/notification' },
    { name: 'Offers', path: '/Offers', isNew: true },
  ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/');
  };

  return (
    <div className="ProfileSection popup-menu">
      {isLoggedIn ? (
        <>
          <h2>Hi, {user.name || 'there'} 👋</h2>
          <p className="profile-email">{user.email}</p>
          <button className="login-signup-btn logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </>
      ) : (
        <>
          <h2>Welcome</h2>
          <p>To access account and manage orders</p>
          <Link to="/Login" onClick={onClose}>
            <button className="login-signup-btn">SIGN IN / SIGN UP</button>
          </Link>
        </>
      )}

      <ul className="profile-menu">
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

export default ProfileSection;
