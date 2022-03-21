'use strict'

//Se llama project porque asi se llama mi coleccion en la base de datos
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	name: String,
	description: String,
	category: String,
	langs: String,
	year: Number,
	image: String
});

module.exports = mongoose.model('Project', ProjectSchema);//Poder utilizarlo fuera de este fichero
// Project = projects  --> y esto guarda los documents en la coleccion