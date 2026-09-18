import React, { useState } from 'react';
import './Signup.css';
import signin from '../components/photo/signin.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    try {
      // Save the new account to the database.
      const res = await axios.post('http://localhost:3389/signup', {
        name: formData.name,
        email: formData.email.trim(),
        password: formData.password,
      });
      // Signup returns the created user document; sign the user in.
      const created = res.data || {};
      login({ name: created.name || formData.name, email: created.email || formData.email });
      navigate('/');
    } catch (err) {
      const msg = err.response && err.response.data;
      if (typeof msg === 'string' && msg.toLowerCase().includes('duplicate')) {
        setError('An account with this email already exists. Please sign in.');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <img src={signin} alt=" " />
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label htmlFor="terms">I hereby agree to all the terms &amp; conditions</label>
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
