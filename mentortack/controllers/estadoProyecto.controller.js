const EstadoProyecto = require("../models/estadoProyecto.model");
const Proyecto = require("../models/proyecto.model");

// Cambiar estado del proyecto (solo coordinador)
const cambiarEstado = async (req, res) => {
  try {
    const { proyectoId, estado, observacion } = req.body;
    const userId = req.user.id;

    // Crear registro del cambio de estado
    const nuevoEstado = new EstadoProyecto({
      proyecto: proyectoId,
      estado,
      observacion,
      cambiadoPor: userId
    });
    await nuevoEstado.save();

    // Actualizar estado actual en el proyecto
    await Proyecto.findByIdAndUpdate(proyectoId, { estado });

    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado", error });
  }
};

// Obtener estado actual e histórico del proyecto
const obtenerEstadosPorProyecto = async (req, res) => {
  try {
    const estados = await EstadoProyecto.find({ proyecto: req.params.proyectoId })
      .populate("cambiadoPor", "nombre apellido email")
      .sort({ fechaCambio: -1 });
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estados", error });
  }
};

module.exports = {
  cambiarEstado,
  obtenerEstadosPorProyecto
};
