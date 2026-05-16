const mongoose = require('mongoose');

const EsquemaUsuarios = new mongoose.Schema({
    IdUsuario: Number,
    Nombre: String,
    Roll: Number,
    Cumpleaños: Date,
    Direccion: String
});

module.exports = mongoose.model('Usuario', EsquemaUsuarios, 'Usuarios');