import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/user.js';
import './auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }

      // Attempt login
      const userData = await authService.login({ email, password });
      
      // Clear any previous errors
      setError('');
      
      // Call parent login handler and navigate
      onLogin(userData);
      navigate('/dashboard');
    } catch (err) {
      // Handle login errors
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-image">
          <div>
            <h1>Welcome Back</h1>
            <p>Login to manage your projects and tasks</p>
          </div>
        </div>
        
        <div className="auth-form">
          <h2 className="auth-title">Login to Your Account</h2>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="auth-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button 
              type="submit" 
              className="auth-button"
            >
              Sign In
            </button>
          </form>
          
          <div className="auth-switch">
            Don't have an account? 
            <span 
              onClick={() => navigate('/signup')}
              style={{ 
                color: '#3498db', 
                marginLeft: '5px', 
                cursor: 'pointer' 
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;