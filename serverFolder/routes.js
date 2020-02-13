const express = require('express');
const routes = express.Router();
const AutonomoController = require('./controllers/AutonomoController');
const AnuncioController = require('./controllers/AnuncioController');
const ContratanteController = require('./controllers/ContratanteController');
const LocalizacaoController = require('./controllers/LocalizacaoController');
const authMidddleware = require('../middleware/auth')
routes.post('/autonomo',AutonomoController.storeRegister);
routes.put('/autonomo/:id',AutonomoController.storeNumber)
routes.post('/contratante', ContratanteController.storeRegister);
routes.put('/contratante/:id',ContratanteController.storeNumber)

routes.post('/contratante/:id/anuncio', AnuncioController.adicionarAnuncio);
routes.get('/contratante/:id/anuncio', AnuncioController.MostrarTodos);
routes.post('/contratante/:id/anuncio/:id/localizacao',LocalizacaoController.adicionarLocalizacao);
module.exports = routes;