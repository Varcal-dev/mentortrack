const mongoose = require("mongoose");

const avanceSchema = new mongoose.Schema({
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "Proyecto", required: true },
  fecha: { type: Date, default: Date.now },
  descripcion: { type: String, required: true },
  documentos: [{ type: String }], // URLs o paths de archivos
  fotos: [{ type: String }], // URLs o paths de imágenes
}, { timestamps: true });

module.exports = mongoose.model("Avance", avanceSchema);
