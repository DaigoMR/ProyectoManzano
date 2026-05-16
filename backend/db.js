const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Desactivamos el buffer para que nos avise rápido si hay fallas de red
        mongoose.set('bufferCommands', false);

        console.log("Conectando a MongoDB Atlas...");
        
        // Esta es tu URI desglosada pero optimizada para DBUsuarios
        await mongoose.connect('mongodb://220300724_db_user:2822004aS@ac-hmqpawl-shard-00-00.tkce0lj.mongodb.net:27017,ac-hmqpawl-shard-00-01.tkce0lj.mongodb.net:27017,ac-hmqpawl-shard-00-02.tkce0lj.mongodb.net:27017/DBUsuarios?ssl=true&replicaSet=atlas-s20kzc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=NodeCluster', {
            connectTimeoutMS: 5000 // Si en 5 segundos no conecta por tu internet, rompe el ciclo en lugar de esperar 10
        });

        console.log("Conexión exitosa a la base de datos DBUsuarios");
    } catch (err) {
        console.error("Error de conexión:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;