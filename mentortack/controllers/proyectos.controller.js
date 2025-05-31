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
    const proyectos = await Proyecto.find().populate("creador", "nombre apellido email").populate("institucion", "nombre");
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos", error });
  }
};

// Obtener un proyecto por ID
const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).populate("creador", "nombre apellido email").populate("institucion", "nombre");
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto", error });
  }
};

// Búsqueda de proyectos con filtros por título, institución, docente o área
const buscarProyectos = async (req, res) => {
  try {
    const { titulo, institucion, docenteId, area } = req.query;
    let filtro = {};

    if (titulo) filtro.titulo = new RegExp(titulo, "i"); // búsqueda insensible a mayúsculas
    if (institucion) filtro.institucion = new RegExp(institucion, "i");
    if (area) filtro.area = new RegExp(area, "i");
    if (docenteId) filtro.creador = docenteId;

    const proyectos = await Proyecto.find(filtro).populate("creador", "nombre apellido email");
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: "Error en la búsqueda de proyectos", error });
  }
};

const actualizarEstadoProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const proyecto = await Proyecto.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado", error });
  }
};


module.exports = {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  buscarProyectos,
  actualizarEstadoProyecto,
};
