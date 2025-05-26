const express = require("express");
const router = express.Router();
const { crearAvance, obtenerAvancesPorProyecto } = require("../controllers/avances.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

// Registrar un avance (cualquier usuario autenticado)
router.post("/", verifyToken, crearAvance);

// Obtener avances de un proyecto
router.get("/:proyectoId", verifyToken, obtenerAvancesPorProyecto);

module.exports = router;
