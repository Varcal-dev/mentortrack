const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/users.controller");

const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Registro y Login
router.post("/register", registerUser);
router.post("/login", loginUser);
  
// Gestión solo por coordinador
router.get("/", verifyToken, requireRole("coordinador"), getUsers);
router.put("/:id", verifyToken, requireRole("coordinador"), updateUser);
router.delete("/:id", verifyToken, requireRole("coordinador"), deleteUser);

// Obtener estudiantes
router.get("/estudiantes", verifyToken, requireRole(["docente", "coordinador"]), async (req, res) => {
  try {
    const estudiantes = await User.find({ rol: "estudiante" }, "nombre apellido identificacion grado");
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estudiantes", error });
  }
});


module.exports = router;
    