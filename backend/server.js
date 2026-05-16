const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./db');
const apiRoutes = require('./src/api');

const app = express();
const port = process.env.PORT || 3000;

// 1. Middlewares obligatorios
app.use(cors());
app.use(bodyParser.json());

// 2. Rutas de tu API
app.use('/api', apiRoutes);

// 3. Conexión a la Base de Datos (Mongoose maneja el buffering internamente en Serverless)
connectDB()
    .then(() => console.log("Conexión inicial a MongoDB Atlas solicitada..."))
    .catch(err => console.error("Error inicial de conexión:", err));

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log("Servidor corriendo localmente en http://localhost:" + port);
    });
}

module.exports = app;