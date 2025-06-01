const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });
//const upload = multer({ dest: "uploads/" });
const express = require("express");
const router = express.Router();
const { crearAvance, obtenerAvancesPorProyecto } = require("../controllers/avances.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

// Registrar un avance (cualquier usuario autenticado)
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "documentos", maxCount: 5 },
    { name: "fotos", maxCount: 10 },
  ]),
  crearAvance
);

// Obtener avances de un proyecto
router.get("/:proyectoId", verifyToken, obtenerAvancesPorProyecto);

module.exports = router;
