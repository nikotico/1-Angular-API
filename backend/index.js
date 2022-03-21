'use strict'

/*Conecta a la base de datos*/
//Forma de una NoSql = Colecciones -> Documentos -> Campo -> Datos
var mongoose = require('mongoose');

var app = require('./app');//llama al app.js donde carga el servidor
var port = 3700; //Del servidor

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portafolio')//Conexion a la base de datos
        .then(() => {
        	console.log("Conexión a la base de datos establecida con exito...");

        	// Creacion del servidor y asignacion del port
        	app.listen(port, () => {
        		console.log("Servidor corriendo correctamente en la url:localhost:3700");
        	});
        })
        .catch(err => console.log(err));

