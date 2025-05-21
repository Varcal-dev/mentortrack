const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.rol !== role) {
    return res.status(403).json({ message: "No autorizado" });
  }
  next();
};

module.exports = { verifyToken, requireRole };
