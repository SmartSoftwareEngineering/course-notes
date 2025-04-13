import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md p-8 rounded" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="block mb-2 border p-2 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="block mb-2 border p-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="block mb-4 border p-2 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;