const Anuncio = require('../models/Anuncio');
const Contratante  = require('../models/Contratante')

module.exports = {
    async adicionarAnuncio(req, res){
        const {id} = req.params;
        const {titulo_anuncio,descricao_anuncio,valor_maximo_anuncio, anexo_anuncio} = req.body
        const contratante = await Contratante.findByPk(id);
        console.log(titulo_anuncio)
        if(!contratante){
            return res.status(400).json({error :'usuario não encontrado!'});
        }
        const anuncio = await Anuncio.create({titulo_anuncio,descricao_anuncio,valor_maximo_anuncio, anexo_anuncio,ativo:1,avaliacao_contratante:1,fk_contratante_id:id})
        return res.json(anuncio)
    },
    async MostrarTodos(req, res){
        
        const anuncio = await Anuncio.findAll({where: {
            ativo: true
          }});
        if(!anuncio){
            
            return res.status(400).json({error :'nenhum registro encontrado!'})
        }
        
        return res.json(anuncio)
    }
}