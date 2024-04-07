const mongoose = require('mongoose');

const libroEsquema = new mongoose.Schema({
    //titulo : String,
    //descripcion : String,
    //prioridad : Number, 
    tituloLibro : String,
    autor : String,
    prioridad : Number,
    editorial : String,
    fechaPublicacion : Date,
    numeroPaginas : Number,
    idioma : String,
    ejemplares : Number

})

const LibroModel = mongoose.model('Libro',libroEsquema,'libro');
module.exports = LibroModel;