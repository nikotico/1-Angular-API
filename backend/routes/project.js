'use strict'


//fichero de rutas para cada controller
var express = require('express');
const cors = require('cors');//Need it para el multipart
var ProjectController = require('../controllers/project');//Accedo a todos mis fuciones del controlador

var router = express.Router();//Method para acceder a las funciones de las rutas
router.use(cors());//Need it para el multipart

//////////////Multier para archivos//////////////////
var crypto = require('crypto')
var multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file = {}, cb) {
    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + fileExtension);
    });
  },
});

var mul_upload = multer({dest: './uploads',storage});

//////////////Multier para archivos//////////////////
//Prueba sql
router.get('/cant', ProjectController.getCantones);

router.get('/home', ProjectController.home);
router.get('/project/:id?', ProjectController.getProject);//?para marcar que sea opcional
router.get('/projects', ProjectController.getProjects);
router.get('/get-image/:image', ProjectController.getImageFile);

router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.post('/upload-image/:id', [mul_upload.single('image')], ProjectController.uploadImage);//Middleware = algo que se ejecuta antes de llamar a ese controlador

router.put('/project/:id', ProjectController.updateProject);//Funciona para la actualización de recursos

router.delete('/project/:id', ProjectController.deleteProject);//Permite eliminar


module.exports = router;//Ya puedo utilizar todas las rutas afuera de aca