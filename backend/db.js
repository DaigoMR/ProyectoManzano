const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Apagamos el búfer para evitar congelamientos en Serverless
        mongoose.set('bufferCommands', false);

        // Usamos tu URL desglosada larga (la que sí le gusta a tu módem)
        // Pero le especificamos la base de datos directa para que jale tus 2 registros
        const connString = 'mongodb://220300724_db_user:2822004aS@ac-hmqpawl-shard-00-00.tkce0lj.mongodb.net:27017,ac-hmqpawl-shard-00-01.tkce0lj.mongodb.net:27017,ac-hmqpawl-shard-00-02.tkce0lj.mongodb.net:27017/DBUsuarios?ssl=true&authSource=admin&retryWrites=true&w=majority';
        
        console.log("Conectando a MongoDB Atlas con ruta desglosada...");
        await mongoose.connect(connString);
        console.log("Conexión exitosa a MongoDB Atlas (DBUsuarios)");
    } catch (err) {
        console.error("Error de conexión en db.js:", err.message);
        throw err; 
    }
};

module.exports = connectDB;