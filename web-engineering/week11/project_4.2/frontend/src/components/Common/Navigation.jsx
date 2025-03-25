import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

// Icons (using simple SVG representations)
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SideNavigation = ({ user, onLogout }) => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { 
      icon: <DashboardIcon />, 
      label: 'Dashboard', 
      path: '/' 
    },
    { 
      icon: <ProjectIcon />, 
      label: 'Projects', 
      path: '/projects' 
    }
  ];

  return (
    <div className="side-navigation">
      <div className="nav-top">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="nav-bottom">
        <div 
          className="user-icon"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <UserIcon />
          {isUserMenuOpen && (
            <div className="user-dropdown">
              <div className="user-info">
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              <div className="user-actions">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <button 
                  onClick={onLogout} 
                  className="dropdown-item logout-btn"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;