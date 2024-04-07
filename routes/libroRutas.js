const express = require('express');
const rutas = express.Router();
const LibroModel = require('../models/Libro');

rutas.get('/', async (req, res) =>{
    try {
        const libros = await LibroModel.find();
        
        res.json(libros);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    
    const nuevoLibro = new LibroModel({
        
        tituloLibro : req.body.tituloLibro,
        autor : req.body.autor,
        prioridad : req.body.prioridad,
        editorial : req.body.editorial,
        fechaPublicacion : req.body.fechaPublicacion,
        numeroPaginas : req.body.numeroPaginas,
        idioma : req.body.idioma,
        ejemplares : req.body.ejemplares

    });
    try {
        const guardarLibro = await nuevoLibro.save();
        res.status(201).json(guardarLibro);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarLibro = await LibroModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarLibro);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarLibro = await LibroModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// ---------- CONSULTAS AVANZADAS ----------

// OBTENER LOS LIBROS EN EL CUAL SUS FECHAS DE PUBLICACION SEAN ENTRE LOS AÑOS 1900 Y 2000

rutas.get('/libros-1900-2000', async (req, res) => {
    try {
        const libros = await LibroModel.find({
            fechaPublicacion: {
                $gte: new Date("1900-01-01T00:00:00.000Z"),
                $lte: new Date("2000-12-31T23:59:59.999Z")
            }
        });
        res.json(libros);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});
// OBTENER AQUELLOS LIBROS QUE SUS PAGINAS SEAN MAS DE 400
rutas.get('/librosMasde400pag', async (req, res) => {
    try {
        const libros = await LibroModel.find({ numeroPaginas: { $gt: 400 } });
        res.json(libros);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});
// MOSTRAR EL TITULO, AUTOR, FECHA DE PUBLICACION Y LOS EJEMPLARES DE AQUELLOS EJEMPLARES QUE SEAN MENORES A 50
rutas.get('/ejemplaresMenores_a_50', async (req, res) => {
    try {
        const libros = await LibroModel.find(
            { ejemplares: { $lte: 50 } },
            { tituloLibro: 1, autor: 1, fechaPublicacion: 1, ejemplares: 1, _id: 0 } 
        );
        res.json(libros);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});

module.exports = rutas;
