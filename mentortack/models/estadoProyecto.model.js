const mongoose = require("mongoose");

const estadoProyectoSchema = new mongoose.Schema({
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "Proyecto", required: true },
  estado: {
    type: String,
    enum: ["Formulación", "Evaluación", "Activo", "Inactivo", "Finalizado"],
    required: true,
  },
  observacion: { type: String },
  fechaCambio: { type: Date, default: Date.now },
  cambiadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("EstadoProyecto", estadoProyectoSchema);
