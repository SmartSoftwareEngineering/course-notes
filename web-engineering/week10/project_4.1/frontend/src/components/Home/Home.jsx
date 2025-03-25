import React from 'react';
import './Home.css';

const Home = ({ user, onLogout }) => {

  return (
    <>
        <div className="user-info">
            <p>As Salam o Alikum, {user.name}</p>
            <p>{user.email}</p>
        </div>
        <div className="user-actions">
            <button 
                onClick={onLogout} 
                className="logout-btn"
            >
                Logout
            </button>
        </div>
    </>
  );
};

export default Home;