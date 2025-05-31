const express = require("express");
const router = express.Router();
const {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  buscarProyectos,
  actualizarEstadoProyecto,
} = require("../controllers/proyectos.controller");

const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Solo docentes pueden crear proyectos
router.post("/", verifyToken, requireRole("docente"), crearProyecto);
// Cambiar estado del Proyecto
router.patch("/:id/estado", verifyToken, actualizarEstadoProyecto);

// Todos los roles pueden consultar
router.get("/", verifyToken, obtenerProyectos);
router.get("/:id", verifyToken, obtenerProyectoPorId);
router.get("/buscar", verifyToken, buscarProyectos);


module.exports = router;
