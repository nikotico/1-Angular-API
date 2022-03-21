'use strict'

var Project = require('../models/project');//Carga el modelo
var fs = require('fs');//libreria filesystem
var path = require('path');//Module de node, que permite cargar rutas fisicas 

//Importar para Sql server
const sql = require('mssql');
var sqlConfig = require('../DB/dbconfig');

var controller = {

	home: function (req, res) {
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	getCantones: async function (req, res) {
		// make sure that any items are correctly URL encoded in the connection string
		let pool = await sql.connect(sqlConfig);
		let result = (await pool.request().query('select * from cantons')).recordsets;

		return res.status(200).send({
			result//Si fue exitoso devuelve el documento
		});	
	},

	test: function (req, res) {
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de project"
		});
	},

	//Guarda un documento en la base de datos
	saveProject: function (req, res) {
		var project = new Project();//Crea la clase y asigna un id

		var params = req.body;//body es lo que viene por post
		project.name = params.name;//accedo a cada uno de los parametros
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored) => {//Se guarda el documento en la base de datos
			if (err) return res.status(500).send({ message: 'Error al guardar el documento.' });

			if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el proyecto.' });

			return res.status(200).send({ project: projectStored });//Si fue exitoso devuelve el documento BSON (Binary JSON)
		});
	},

	//Selecciona un documento de la base de datos, por su id mediante get
	getProject: function (req, res) {
		var projectId = req.params.id;//params es para ingresar a los datos que vienen por get/url

		if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe.' });

		Project.findById(projectId, (err, project) => {

			if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

			if (!project) return res.status(404).send({ message: 'El proyecto no existe.' });

			return res.status(200).send({
				project//Si fue exitoso devuelve el documento
			});

		});
	},

	//Selecciona un documento todos de la base de datos, por su id mediante get
	getProjects: function (req, res) {

		//Saca todos y los acomoda (group by) por anno
		Project.find({}).sort('-year').exec((err, projects) => {

			if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

			if (!projects) return res.status(404).send({ message: 'No hay projectos que mostrar.' });

			return res.status(200).send({ projects });
		});

	},

	//Actualizar un documento by Id en la DB
	updateProject: function (req, res) {
		var projectId = req.params.id;
		var update = req.body;//Agarra todos los valores

		Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
			if (err) return res.status(500).send({ message: 'Error al actualizar' });

			if (!projectUpdated) return res.status(404).send({ message: 'No existe el proyecto para actualizar' });

			return res.status(200).send({
				project: projectUpdated //projectUpdated = al documento nuevo gracias al {new:true}
			});
		});

	},
	//Elimina un documento by Id en la DB
	deleteProject: function (req, res) {
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
			if (err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' });

			if (!projectRemoved) return res.status(404).send({ message: "No se puede eliminar ese proyecto." });

			return res.status(200).send({
				project: projectRemoved // Me da el objeto eliminado
			});
		});
	},


	uploadImage: function (req, res) {
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if (req.file) {//El multipart me permite hace esto
			var filePath = req.file.path;
			var fileSplit = filePath.split('\\');//Lo separo de la \\ 
			var fileName = fileSplit[1];//y guardo todo lo sigue de eso, que seria el nombre
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
				Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
					if (err) return res.status(500).send({ message: 'La imagen no se ha subido' });

					if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe y no se ha asignado la imagen' });

					return res.status(200).send({
						project: projectUpdated
					});
				});

			} else {
				fs.unlink(filePath, (err) => {
					return res.status(200).send({ message: 'La extensión no es válida' });
				});
			}

		} else {
			return res.status(200).send({
				message: fileName
			});
		}

	},

	getImageFile: function (req, res) {
		var file = req.params.image;//El nombre del archivo
		var path_file = './uploads/' + file;

		fs.stat(path_file, (error) => {
			if (!error) {
				return res.sendFile(path.resolve(path_file));
			} else {
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
};

module.exports = controller;//Exporta todas las funciones que tiene la variable(Clase) controller