const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const librosRutas = require('./routes/libroRutas');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;

app.use(express.json());

mongoose.connect(MONGODB_URI)
    .then(() => {
                console.log('conexion realizado con MONGODB exitoso');
                app.listen(PORT, () => { console.log(`Servidor en funcionando en el puerto: ${PORT}`) });
            })
    .catch( error => console.log("Error de conexion con MongoDB", error));

app.use('/ruta-libro',librosRutas)
