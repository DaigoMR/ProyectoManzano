const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Desactivamos el buffer para evitar congelamientos de 10 segundos
        mongoose.set('bufferCommands', false);

        // Jalamos la URI de la variable de entorno que pusimos en Vercel
        const connString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/DBUsuarios';
        
        await mongoose.connect(connString);
        console.log("Conexión exitosa a MongoDB Atlas");
    } catch (err) {
        console.error("Error de conexión en db.js:", err.message);
        // ¡OJO! Quitamos el process.exit(1) para que Vercel no muera
        throw err; 
    }
};

module.exports = connectDB;