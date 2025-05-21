const Proyecto = require("../models/proyecto.model");

// Crear un nuevo proyecto (solo docentes)
const crearProyecto = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const nuevoProyecto = new Proyecto({
      ...data,
      creador: userId
    });

    const proyectoGuardado = await nuevoProyecto.save();
    res.status(201).json(proyectoGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto", error });
  }
};

// Obtener todos los proyectos
const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate("creador", "nombre apellido email");
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos", error });
  }
};

// Obtener un proyecto por ID
const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).populate("creador", "nombre apellido email");
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto", error });
  }
};

module.exports = {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId
};
