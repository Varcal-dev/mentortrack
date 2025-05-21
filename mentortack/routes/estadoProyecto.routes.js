const express = require("express");
const router = express.Router();
const { cambiarEstado, obtenerEstadosPorProyecto } = require("../controllers/estadoProyecto.controller");

const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Solo coordinador puede cambiar estado
router.post("/cambiar", verifyToken, requireRole("coordinador"), cambiarEstado);

// Cualquiera puede consultar el historial de estados
router.get("/:proyectoId", verifyToken, obtenerEstadosPorProyecto);

module.exports = router;
