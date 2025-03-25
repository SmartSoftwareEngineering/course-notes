import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Login handler
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    Navigate('/login');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            user 
              ? <Home user={user} onLogout={handleLogout} />
              : <Navigate to="/login" replace /> 
          } 
        />
        <Route 
          path="/login" 
          element={
            user 
              ? <Navigate to="/" replace /> 
              : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            user 
              ? <Navigate to="/" replace /> 
              : <Signup onSignup={handleLogin} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;