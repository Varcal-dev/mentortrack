// server.js
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB(); // Conexión a MongoDB

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
