import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import signin from '../components/photo/signin.png';
import { useAuth } from '../Context/AuthContext';

// Built-in demo account (works even on a fresh database)
const DEMO_USERS = [
  { email: 'admin@craftbazar.com', password: 'craft123', name: 'Admin' },
  { email: 'user@craftbazar.com', password: 'user123', name: 'Guest' },
];

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    const email = formData.email.trim();

    // 1) demo account shortcut
    const demo = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === formData.password
    );
    if (demo) {
      login({ name: demo.name, email: demo.email });
      navigate('/');
      return;
    }

    // 2) real account stored in the database
    try {
      const res = await axios.post('http://localhost:3389/login', {
        email,
        password: formData.password,
      });
      if (res.data.success) {
        login({ name: res.data.user.name, email: res.data.user.email });
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <img src={signin} alt="" />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign in</h2>
        <p>Don't have an account? <Link to="/Signup">Sign up</Link></p>
        {error && <p className="error-message">{error}</p>}
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
          <p>Forgot password?</p>
        </div>
        <button type="submit" className="btn btn-success">Sign in</button>

        <div className="demo-creds">
          <span>Demo login</span>
          admin@craftbazar.com &nbsp;/&nbsp; craft123
        </div>
      </form>
    </div>
  );
}

export default Login;
