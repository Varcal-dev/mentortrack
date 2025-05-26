const Usuario = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.findOne({ email });
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    usuario: {
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  });
};
