const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./db');
const apiRoutes = require('./src/api');

const app = express();
const port = 3000;

// 1. Middlewares obligatorios (CORS debe ir arriba de las rutas)
app.use(cors());
app.use(bodyParser.json());

// 2. Rutas de tu API
app.use('/api', apiRoutes);

// 3. Función controlada para arrancar el backend
async function startServer() {
    console.log("Iniciando componentes del backend...");
    try {
        // Esperamos a que MongoDB Atlas dé el banderazo de salida
        await connectDB();
        console.log("Conexión establecida con éxito a DBUsuarios");

        // Hasta que la línea de arriba se cumpla, abrimos las puertas del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo en http://localhost:" + port);
        });
    } catch (error) {
        console.error("No se pudo arrancar el servidor:", error);
    }
}

startServer();