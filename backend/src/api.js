const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ModeloUsuarios = require('./esquemaUsuarios');

// Connecting to database
const query = 'mongodb://127.0.0.1:27017/DBUsuarios';

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(query)
    .then(() => console.log("DB conectada"))
    .catch(err => console.log("Error DB:", err));

module.exports = router;

// CREATE: Auto-asignación de IdUsuario
router.post('/guardar', async (req, res) => {
    try {
        // 1. Buscamos el usuario con el IdUsuario más alto para saber cuál sigue
        const ultimoUsuario = await ModeloUsuarios.findOne().sort({ IdUsuario: -1 });
        
        // 2. Si no hay usuarios, empezamos en 1. Si hay, sumamos +1 al máximo encontrado
        const siguienteId = ultimoUsuario ? ultimoUsuario.IdUsuario + 1 : 1;
        
        // 3. Creamos el nuevo registro inyectando el ID generado
        const nuevoUsuario = new ModeloUsuarios({
            ...req.body,
            IdUsuario: siguienteId
        });

        await nuevoUsuario.save();
        res.send("Datos insertados correctamente con ID: " + siguienteId);
    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).send("Error interno al generar ID");
    }
});

// READ ALL
router.get('/listar', async (req, res) => {
    const data = await ModeloUsuarios.find();
    res.send(data);
});

// READ ONE
router.get('/obtener/:id', async (req, res) => {
    const data = await ModeloUsuarios.findOne({ IdUsuario: req.params.id });
    res.send(data);
});

// UPDATE: Validación de ID
router.put('/actualizar/:id', async (req, res) => {
    // Si el ID es inválido, detenemos la ejecución antes de que Mongoose falle
    if (!req.params.id || req.params.id === 'undefined') {
        return res.status(400).send("Error: No se recibió un ID válido para actualizar.");
    }

    try {
        const data = await ModeloUsuarios.findOneAndUpdate(
            { IdUsuario: req.params.id }, 
            req.body,
            { new: true }
        );
        res.send("Datos actualizados");
    } catch (error) {
        res.status(500).send("Error al actualizar");
    }
});

// DELETE: Validación de ID
router.delete('/eliminar/:id', async (req, res) => {
    if (!req.params.id || req.params.id === 'undefined') {
        return res.status(400).send("Error: No se puede eliminar un registro sin ID.");
    }

    try {
        await ModeloUsuarios.findOneAndDelete({ IdUsuario: req.params.id });
        res.send("Eliminado");
    } catch (error) {
        res.status(500).send("Error al eliminar");
    }
});

module.exports = router;