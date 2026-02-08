const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { asyncHandler } = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already in use" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashed });

  const token = generateToken({ id: user._id });

  res.status(201).json({
    message: "Registered successfully",
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken({ id: user._id });

  res.json({
    message: "Logged in successfully",
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
});

module.exports = { register, login };