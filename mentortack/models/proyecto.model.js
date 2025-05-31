const mongoose = require("mongoose");

const integranteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  identificacion: String,
  grado: String
}, { _id: false });

const proyectoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  area: String,
  objetivos: String,
  fechaInicio: Date,
  fechaFin: Date,
  detalleCronograma: String,
  presupuesto: String,
  institucion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institucion",
    required: true,
  },
  observaciones: String,
  estado: {
    type: String,
    enum: ["Formulación", "Evaluación", "Activo", "Inactivo", "Finalizado"],
    default: "Formulación"
  },
  creador: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  integrantes: [integranteSchema],
}, { timestamps: true });

module.exports = mongoose.model("Proyecto", proyectoSchema);
