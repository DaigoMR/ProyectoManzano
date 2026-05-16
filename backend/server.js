const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');
const apiRoutes = require('./src/api');

const app = express();
const port = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES DE CONFIGURACIÓN
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// CONEXIÓN A LA BASE DE DATOS
// ==========================================
// Arranca la conexión en segundo plano al levantar el servidor
connectDB();

// ==========================================
// CONTROL DE FLUJO PARA VERCEL (SERVERLESS)
// ==========================================
// Este bloque detiene cualquier petición si Mongoose aún está 
// negociando la conexión con Atlas, evitando el error de bufferCommands.
app.use(async (req, res, next) => {
    // readyState: 1 = Conectado, 2 = Conectando
    if (mongoose.connection.readyState !== 1) {
        console.log("Base de datos conectando... Esperando a Atlas");
        try {
            // Obliga a Express a esperar hasta que la promesa de conexión se cumpla
            await mongoose.connection.asPromise();
            next();
        } catch (err) {
            console.error("La base de datos no respondió a tiempo:", err.message);
            return res.status(500).json({ 
                error: "Error interno", 
                detalles: "La base de datos no se conectó a tiempo." 
            });
        }
    } else {
        next();
    }
});

// ==========================================
// RUTAS DE LA API
// ==========================================
app.use('/', apiRoutes);    // Crucial para Vercel porque corta el prefijo '/api'
app.use('/api', apiRoutes); // Mantiene compatibilidad en tu entorno local

// ==========================================
// ARRANQUE DEL SERVIDOR (SOLO EN LOCAL)
// ==========================================
// Vercel maneja su propio ruteo en producción y no necesita escuchar un puerto.
// Al meterlo en este IF, evitamos que rompa o choque en la nube.
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Servidor local corriendo en http://localhost:${port}`);
    });
}

// OBLIGATORIO PARA VERCEL: Exportamos la app para que la nube la controle
module.exports = app;