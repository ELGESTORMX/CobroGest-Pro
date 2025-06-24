require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const connectDB = require('./config/db'); // Asegúrate que esta ruta y archivo existen y exportan la función de conexión

const authRoutes = require('./routes/auth'); // Verifica que ./routes/auth.js existe y exporta el router correctamente

const app = express();

// Seguridad: deshabilitar cabecera x-powered-by para no revelar tecnología
app.disable('x-powered-by');

// Middleware para compresión de respuestas
app.use(compression());

// Middleware para habilitar CORS (configura opciones si es necesario)
app.use(cors());

// Middleware para parsear JSON en requests
app.use(express.json());

// Montar las rutas de autenticación bajo /api/auth
app.use('/api/auth', authRoutes);

// Ruta base para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('API CobroGest Pro funcionando');
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos y luego iniciar servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  });
