const express = require('express');
const router = express.Router();
const institucionesController = require('../controllers/instituciones.controller');
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

//router.post("/", verifyToken, requireRole("coordinador"), crearProyecto);


// Create a new Institucion
router.post('/',verifyToken, requireRole("coordinador"), institucionesController.create);

// Obtener todas Instituciones
router.get('/', verifyToken, institucionesController.findAll);

// Obtener una Institucion with id
router.get('/:id', verifyToken, institucionesController.findOne);

// Actualizar an Institucion with id
router.put('/:id', verifyToken, requireRole("coodrinador"), institucionesController.update);

// Eliminar una Institucion with id
router.delete('/:id', verifyToken, requireRole("coordinador"), institucionesController.delete);

module.exports = router;
