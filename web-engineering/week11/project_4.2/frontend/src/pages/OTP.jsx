import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const requestOtp = async () => {
    await axios.post("/auth/otp/request", { email });
    alert("OTP sent to your email");
  };

  const verifyOtp = async () => {
    try {
      await axios.post("/auth/otp/verify", { email, otp });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md p-8 rounded">
        <h2 className="text-xl font-bold mb-4">OTP Login</h2>
        <input className="block mb-2 border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="bg-yellow-500 text-white px-4 py-2 mb-2 rounded" onClick={requestOtp}>Request OTP</button>
        <input className="block mb-2 border p-2 w-full" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={verifyOtp}>Verify OTP</button>
      </div>
    </div>
  );
};

export default OTP;