const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

exports.checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: "Access denied" });
  next();
};
