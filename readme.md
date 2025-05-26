Aplicación web diseñada para facilitar el registro, seguimiento y control de ejecución de proyectos escolares de investigación, promoviendo la colaboración entre estudiantes, docentes y coordinadores.

La plataforma permite registrar avances, hitos, documentos y estados del proyecto de forma organizada y accesible.


## 📦 Tecnologías Utilizadas

- ⚙️ **Node.js** – Entorno de ejecución JavaScript.
- 🧭 **Express.js** – Framework para construir APIs REST.
- 🍃 **MongoDB** – Base de datos NoSQL.
- 🧬 **Mongoose** – ODM para MongoDB.
- 🔐 **JWT (JSON Web Tokens)** – Autenticación basada en tokens.
- 🧂 **bcrypt** – Cifrado de contraseñas.
- 🌐 **CORS** – Compartición de recursos entre dominios.
- 📄 **PDFKit** – Generación de reportes en PDF.

## 🛠️ Instalación
Ejecucion de la aplicación localmente:

1. 📥 **Clona el repositorio:**
   ```bash
   git clone <repository_url>
    
2. 📂 Accede a la carpeta del proyecto:
    ```bash
    cd molanojholbypf
    
3. 📦 Instala las dependencias:
    ```bash
    npm install
    
4. ⚙️ Configura las variables de entorno:

    Crea un archivo .env en la raíz del proyecto y define las siguientes variables:
    ```bash
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/mentortack
    JWT_SECRET=tu_clave_secreta
    
5. ▶️ Inicia el servidor:
    ```bash
    npm start
    
    La aplicación estará disponible en http://localhost:3000.

# 📁 Estructura del Proyecto

molanojholbypf/
    │
    ├── config/           # Configuración de la base de datos
    ├── controllers/      # Lógica de negocio (controladores)
    ├── middlewares/      # Funciones intermedias (auth, logs, etc.)
    ├── models/           # Modelos de datos con Mongoose
    ├── routes/           # Definición de rutas y endpoints
    ├── uploads/          # Documentos y archivos subidos
    ├── .env              # Variables de entorno
    ├── server.js         # Archivo principal del servidor
    └── README.md         # Este documento

# 🔌 Endpoints de la API

- 🔐 Autenticación:

    POST /api/users/register – Registro de usuario

    POST /api/users/login – Inicio de sesión

- 📚 Proyectos:

    GET /api/proyectos – Obtener todos los proyectos

    POST /api/proyectos – Crear un nuevo proyecto

    PUT /api/proyectos/:id – Actualizar un proyecto por ID

    DELETE /api/proyectos/:id – Eliminar un proyecto por ID

    GET /api/proyectos/buscar – Buscar proyectos por filtros

- 📈 Avances / Hitos:

    GET /api/avances – Listar avances

    POST /api/avances – Crear un nuevo avance

- 📊 Estados del Proyecto:

    GET /api/estadoProyecto – Consultar estados existentes

    POST /api/estadoProyecto – Registrar un nuevo estado

    PATCH /api/estadoProyecto/:id – Cambiar el estado de un proyecto

- 🧾 Reportes PDF:

    GET /api/reportes/proyectos – Generar y descargar un reporte PDF de proyectos

