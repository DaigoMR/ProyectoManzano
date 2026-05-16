const express = require('express');
const router = express.Router();

const ModeloUsuarios = require('./esquemaUsuarios');

// ======================
// CREATE
// ======================
router.post('/guardar', async (req, res) => {
    try {
        const ultimoUsuario = await ModeloUsuarios.findOne().sort({ IdUsuario: -1 });
        const siguienteId = ultimoUsuario ? ultimoUsuario.IdUsuario + 1 : 1;

        const nuevoUsuario = new ModeloUsuarios({
            ...req.body,
            IdUsuario: siguienteId
        });

        await nuevoUsuario.save();

        // Usamos .json() para mantener consistencia
        return res.status(201).json({
            mensaje: "Datos insertados correctamente",
            id: siguienteId
        });

    } catch (error) {
        console.error("ERROR CREATE:", error);
        // Devolvemos JSON en lugar de texto plano
        return res.status(500).json({ 
            error: "Error al guardar el usuario", 
            detalles: error.message 
        });
    }
});

// ======================
// READ ALL
// ======================
router.get('/listar', async (req, res) => {
    try {
        const data = await ModeloUsuarios.find();
        return res.json(data);
    } catch (error) {
        console.error("ERROR LISTAR:", error);
        // Cambiado .send() por .json() para que React no truene con el HTML
        return res.status(500).json({ 
            error: "Error al obtener la lista de usuarios", 
            detalles: error.message 
        });
    }
});

// ======================
// READ ONE
// ======================
router.get('/obtener/:id', async (req, res) => {
    try {
        const data = await ModeloUsuarios.findOne({
            IdUsuario: Number(req.params.id)
        });
        return res.json(data);
    } catch (error) {
        console.error("ERROR OBTENER:", error);
        return res.status(500).json({ 
            error: "Error al obtener el usuario", 
            detalles: error.message 
        });
    }
});

// ======================
// UPDATE
// ======================
router.put('/actualizar/:id', async (req, res) => {
    if (!req.params.id || req.params.id === 'undefined') {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const data = await ModeloUsuarios.findOneAndUpdate(
            { IdUsuario: Number(req.params.id) },
            req.body,
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json({
            mensaje: "Actualizado correctamente",
            usuario: data
        });

    } catch (error) {
        console.error("ERROR UPDATE:", error);
        return res.status(500).json({ 
            error: "Error al actualizar el usuario", 
            detalles: error.message 
        });
    }
});

// ======================
// DELETE
// ======================
router.delete('/eliminar/:id', async (req, res) => {
    if (!req.params.id || req.params.id === 'undefined') {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const eliminado = await ModeloUsuarios.findOneAndDelete({
            IdUsuario: Number(req.params.id)
        });

        if (!eliminado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json({
            mensaje: "Eliminado correctamente"
        });

    } catch (error) {
        console.error("ERROR DELETE:", error);
        return res.status(500).json({ 
            error: "Error al eliminar el usuario", 
            detalles: error.message 
        });
    }
});

module.exports = router;