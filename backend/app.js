'use strict'

//Guarda toda la configuracion de express
//Esto para ajustar el servidor y hacer las peticiones

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas o todas las rutas
var project_routes = require('./routes/project');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));//Necesaria para bodyparse
app.use(bodyParser.json());//Cualquier peticion la convierte en json

// Configurar cabeceras y cors
//En especial es para el manejo con el front y que no hayan errores
//Y es un middleware (.use)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas o las URL seran /api/home o /api/test
app.use('/api', project_routes);


// exportar, para utilizar en todo lado
module.exports = app;

