const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true }).json({ token });
});

// OTP request
router.post("/otp/request", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const otp = otpGenerator.generate(6, { digits: true });
  user.otp = otp;
  user.otpExpiry = Date.now() + 300000; // 5 minutes
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`
  });

  res.json({ message: "OTP sent" });
});

// OTP verify
router.post("/otp/verify", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true }).json({ token });
});

// Protected route example
router.get("/admin/dashboard", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/user/profile", verifyToken, (req, res) => {
  res.json({ message: "User profile data" });
});

module.exports = router;