const express = require("express");
const router = express.Router();
const {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId
} = require("../controllers/proyectos.controller");

const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Solo docentes pueden crear proyectos
router.post("/", verifyToken, requireRole("docente"), crearProyecto);

// Todos los roles pueden consultar
router.get("/", verifyToken, obtenerProyectos);
router.get("/:id", verifyToken, obtenerProyectoPorId);

module.exports = router;
