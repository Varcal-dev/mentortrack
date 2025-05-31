const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/users.routes");
const proyectoRoutes = require("./routes/proyectos.routes");
const avanceRoutes = require("./routes/avances.routes");
const estadoProyectoRoutes = require("./routes/estadoProyecto.routes");
const reportesRoutes = require("./routes/reportes.routes");
const authRoutes = require("./routes/auth.routes");
//const cors = require('cors');
const usersRoutes = require("./routes/users.routes");



const app = express(); 

app.use(cors());
app.use(express.json());

// Rutas
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes); // <-- /login
app.use("/api/usuarios", userRoutes);
app.use("/api/users", usersRoutes); // <-- aquí se monta /users
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/avances", avanceRoutes);
app.use("/api/estadoProyecto", estadoProyectoRoutes);
app.use("/api/reportes", reportesRoutes);



app.get("/", (req, res) => {
  res.send("API funcionando");
});

module.exports = app;
