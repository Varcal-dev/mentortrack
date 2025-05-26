const express = require("express");
const router = express.Router();
const { generarReporteProyectos } = require("../controllers/reportes.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/proyectos", verifyToken, generarReporteProyectos);

module.exports = router;
