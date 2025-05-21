const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/users.routes");
const proyectoRoutes = require("./routes/proyectos.routes");
const avanceRoutes = require("./routes/avances.routes");


const app = express(); 

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", userRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/avances", avanceRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando");
});

module.exports = app;
