require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

console.log("Modo actual:", process.env.NODE_ENV);
console.log("Base de datos host:", process.env.DB_HOST);

// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar librería CORS
const cors = require("cors");
// Importar librería de manejo de cookies
const cookieParser = require("cookie-parser");
// Importar gestores de rutas
const marcaRoutes = require("./routes/marcaRoutes");
const modeloRoutes = require("./routes/modeloRoutes");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar CORS para admitir cualquier origen
const allowedOrigins = [
  "http://localhost:3000",  // Para desarrollo local
  "https://coches-production.up.railway.app", // Para producción
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (por ejemplo, desde Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS no permitido"));
    },
    credentials: true, // Permite envío de cookies y headers autenticados
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  })
);

// Habilitar el análisis de cookies
app.use(cookieParser());

// Configurar el middleware para servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, "public")));

// Rutas del API
app.use("/api/marca", marcaRoutes);
app.use("/api/modelo", modeloRoutes);

// Ruta para manejar cualquier solicitud no coincidente y devolver el frontend (index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});

// Exportamos la aplicación para pruebas
module.exports = app;