const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Autonomo = require('../models/Autonomo');
const Contratante = require('../models/Contratante');
const Anuncio = require('../models/Anuncio');
const Qualificacao = require('../models/Qualificacao');
const Localizacao = require('../models/Localizacao');
const Interessados = require('../models/Interessados');
const TermoCompromisso = require('../models/TermoCompromisso');
const HistoricoAutonomo = require('../models/HistoricoAutonomo');
const HistoricoContratante = require('../models/HistoricoContratante');

Autonomo.init(connection);
Contratante.init(connection);
Anuncio.init(connection);
Contratante.associate(connection.models)

Anuncio.associate(connection.models);

Qualificacao.init(connection);
Qualificacao.associate(connection.models);
Localizacao.init(connection);
Localizacao.associate(connection.models);
Interessados.init(connection);
Interessados.associate(connection.models);
TermoCompromisso.init(connection);
TermoCompromisso.associate(connection.models);
HistoricoAutonomo.init(connection);
HistoricoAutonomo.associate(connection.models);
HistoricoContratante.init(connection);
HistoricoContratante.associate(connection.models);
module.exports = connection;