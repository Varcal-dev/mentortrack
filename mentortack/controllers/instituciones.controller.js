const Institucion = require('../models/institucion.model');

// Create a new institucion
exports.create = (req, res) => {
  const institucion = new Institucion({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email
  });

  institucion.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Institucion."
      });
    });
};

// Retrieve all instituciones
exports.findAll = (req, res) => {
  Institucion.find()
    .then(instituciones => {
      res.send(instituciones);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving instituciones."
      });
    });
};

// Find a single institucion with an id
exports.findOne = (req, res) => {
  Institucion.findById(req.params.id)
    .then(institucion => {
      if(!institucion) {
        return res.status(404).send({
          message: "Institucion not found with id " + req.params.id
        });
      }
      res.send(institucion);
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Institucion not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving institucion with id " + req.params.id
      });
    });
};

// Update an institucion identified by the id in the request
exports.update = (req, res) => {
  Institucion.findByIdAndUpdate(req.params.id, {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email
  }, {new: true})
    .then(institucion => {
      if(!institucion) {
        return res.status(404).send({
          message: "Institucion not found with id " + req.params.id
        });
      }
      res.send(institucion);
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Institucion not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating institucion with id " + req.params.id
      });
    });
};

// Delete an institucion with the specified id in the request
exports.delete = (req, res) => {
  Institucion.findByIdAndRemove(req.params.id)
    .then(institucion => {
      if(!institucion) {
        return res.status(404).send({
          message: "Institucion not found with id " + req.params.id
        });
      }
      res.send({message: "Institucion deleted successfully!"});
    })
    .catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Institucion not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete institucion with id " + req.params.id
      });
    });
};
