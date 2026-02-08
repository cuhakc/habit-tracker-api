const User = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (email && email !== req.user.email) {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });
  }

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { ...(username && { username }), ...(email && { email }) },
    { new: true, runValidators: true }
  ).select("-password");

  res.json({ message: "Profile updated", user: updated });
});

module.exports = { getProfile, updateProfile };