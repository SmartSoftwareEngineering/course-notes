import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/user';
import './Auth.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // Remove confirm password before sending to backend
      const { confirmPassword, ...signupData } = formData;
      
      // Attempt signup
      const userData = await authService.signup(signupData);
      
      // Clear any previous errors
      setError('');
      
      // Call parent signup handler and navigate
      onSignup(userData);
      navigate('/');
    } catch (err) {
      // Handle signup errors
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-image">
          <div>
            <h1>Get Started</h1>
            <p>Create an account to unlock powerful project management tools</p>
          </div>
        </div>
        
        <div className="auth-form">
          <h2 className="auth-title">Create Your Account</h2>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="auth-input"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <input
              type="password"
              name="confirmPassword"
              className="auth-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            
            <button 
              type="submit" 
              className="auth-button"
            >
              Sign Up
            </button>
          </form>
          
          <div className="auth-switch">
            Already have an account? 
            <span 
              onClick={() => navigate('/login')}
              style={{ 
                color: '#3498db', 
                marginLeft: '5px', 
                cursor: 'pointer' 
              }}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;