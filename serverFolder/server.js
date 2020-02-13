const express = require('express');
require('./database');
const app = express();
const routes = require('./routes');
const Middleware = require('.././middleware/auth')

app.use(express.json());
app.use('/contratante/:id/anuncio',Middleware);
app.use('/contratante/:id/anuncio/:id/localizacao',Middleware);
app.use(routes);

app.listen(3333);