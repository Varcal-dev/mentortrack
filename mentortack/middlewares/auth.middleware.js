const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1]; // ← Extrae solo el token

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
