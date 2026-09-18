import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import diy from '../photo/diy.png';
import './Diy.css';

function Reason() {
  return (
    <div>
      <div className="diy-container">
        <h1 className="outlined-text">Unleash Your Creativity With Us</h1>
        <Link to="/login" className="login-link">
        <img src={diy} alt="DIY Image" />
        </Link>
      </div>
    </div>
  );
}

export default Reason;
