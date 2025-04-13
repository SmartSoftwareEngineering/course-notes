import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./redux/slices/authSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route
          path="/"
          element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;