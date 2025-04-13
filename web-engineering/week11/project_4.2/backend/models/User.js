const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  googleId: String,
  otp: String,
  otpExpiry: Date
});

module.exports = mongoose.model("User", userSchema);
