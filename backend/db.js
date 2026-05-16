const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 1. Apagamos el buffer por completo para evitar bloqueos en la nube
        mongoose.set('bufferCommands', false);

        // 2. Intentamos jalar la variable de Vercel
        const connString = process.env.MONGO_URI;
        
        // 🚨 SI LA VARIABLE LLEGA VACÍA, MANDAMOS UN ERROR CLARO
        if (!connString) {
            console.error("ALERTA: process.env.MONGO_URI no está llegando al archivo db.js");
            // Ponemos temporalmente tu cadena de texto directa aquí para rescatar el deploy si Vercel la ignora
            return await mongoose.connect('mongodb://220300724_db_user:2822004aS@ac-hmqpawl-shard-00-00.tkce0lj.mongodb.net:27017,ac-hmqpawl-shard-00-01.tkce0lj.mongodb.net:27017,ac-hmqpawl-shard-00-02.tkce0lj.mongodb.net:27017/DBUsuarios?ssl=true&replicaSet=atlas-s20kzc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=NodeCluster');
        }
        
        await mongoose.connect(connString);
        console.log("Conexión exitosa a MongoDB Atlas");
    } catch (err) {
        console.error("Error de conexión en db.js:", err.message);
        throw err; 
    }
};

module.exports = connectDB;