const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ["estudiante", "docente", "coordinador"], required: true },
  identificacion: String,
  grado: String, // aplicable solo a estudiantes
  institucion: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
