const express = require('express');
const routes = express.Router();
const AutonomoController = require('./controllers/AutonomoController');
const authMidddleware = require('../middleware/auth')
routes.post('/autonomo',AutonomoController.storeByFacebookApi);

routes.get('/autonomo/:id',AutonomoController.getOne);
//routes.get('/autonomo/',AutonomoController.getAll);
routes.put('/autonomo/:id',AutonomoController.storeNumber)
module.exports = routes;