const express = require('express');
const router = express.Router();
const institucionesController = require('../controllers/instituciones.controller');

// Create a new Institucion
router.post('/', institucionesController.create);

// Retrieve all Instituciones
router.get('/', institucionesController.findAll);

// Retrieve a single Institucion with id
router.get('/:id', institucionesController.findOne);

// Update an Institucion with id
router.put('/:id', institucionesController.update);

// Delete an Institucion with id
router.delete('/:id', institucionesController.delete);

module.exports = router;
