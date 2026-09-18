import React from 'react';
import './Qualities.css';

function Qualities() {
  return (
    <div className="qualities-container">
      <div className="quality-item" title="If your product breaks, we're here to save you.">
        <i className="fa-solid fa-screwdriver-wrench"></i>
        <p>Repair &amp; Revive in one click</p>
      </div>
      <div className="quality-item">
        <i className="fa-solid fa-clock-rotate-left"></i>
        <p>7-Day Replacement</p>
      </div>
      <div className="quality-item">
        <i className="fa-regular fa-comments"></i>
        <p>24x7 Customer Support</p>
      </div>
      <div className="quality-item">
        <i className="fa-regular fa-credit-card"></i>
        <p>Secure Transactions</p>
      </div>
    </div>
  );
}

export default Qualities;
