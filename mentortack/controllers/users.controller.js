const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol, identificacion, grado, institucion } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol,
      identificacion,
      grado,
      institucion
    });

    await user.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, rol: user.rol, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// Listar todos los usuarios (solo coordinador)
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Editar usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario", error });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
};
