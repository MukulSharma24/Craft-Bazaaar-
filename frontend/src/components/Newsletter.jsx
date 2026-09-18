import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:3389/subscribe', { email });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <div className='img'>
        <i className="fa-regular fa-envelope fa-3x"></i> 
        </div>
        <div className="update">
        <h2>Stay Updated</h2>
        <p>Subscribe to get the latest updates and offers.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
}

export default Newsletter;
