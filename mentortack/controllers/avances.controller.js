const Avance = require("../models/avance.model");

// Crear un avance
const crearAvance = async (req, res) => {
  try {
    const { proyecto, fecha, descripcion } = req.body;
    const documentos = req.files["documentos"]?.map(file => file.path) || [];
    const fotos = req.files["fotos"]?.map(file => file.path) || [];

    const nuevoAvance = new Avance({
      proyecto,
      fecha,
      descripcion,
      documentos,
      fotos
    });

    const avanceGuardado = await nuevoAvance.save();
    res.status(201).json(avanceGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar avance", error });
  }
};


// Obtener avances de un proyecto
const obtenerAvancesPorProyecto = async (req, res) => {
  try {
    const avances = await Avance.find({ proyecto: req.params.proyectoId }).sort({ fecha: -1 });
    res.json(avances);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener avances", error });
  }
};

module.exports = {
  crearAvance,
  obtenerAvancesPorProyecto
};
