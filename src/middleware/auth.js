const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized: missing token" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "Server misconfigured (JWT_SECRET missing)" });

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized: user not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid/expired token" });
  }
}

module.exports = { auth };