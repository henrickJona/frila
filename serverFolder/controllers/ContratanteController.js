const Contratante = require('../models/Contratante');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
function generateToken(params ={}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 864000,
    })
}
module.exports = {
    
    async getOne(req,res){
        const  {id} = req.params;
        
        const contratante = await Contratante.findOne({ where: { id: id } })
        if(!contratante){
            return res.status(400).json({error:'User not found'})
        }else{
            return res.json(contratante);
        }
        
    },

    async storeRegister(req, res){
        const {nome_contratante,sobre_nome_contratante, foto_perfil_contratante, email_contratante} = req.body;
        
        const contratante = await Contratante.findOrCreate({where :{email_contratante:email_contratante}, defaults:{nome_contratante,sobre_nome_contratante,foto_perfil_contratante,email_contratante,
            telefone_contratante:'teste',valor_investido_contratante:0.0,avaliacao_contratante:1}})
        if(contratante.telefone_contratante != 'teste')
            return res.json({contratante,token:generateToken({id:contratante.id})});
        return res.json(contratante);
        
    },
    async storeNumber(req, res){
        const  {id} = req.params;
        const   {telefone_contratante} = req.body;
        console.log(id)
        console.log(telefone_contratante)
        const contratante = await Contratante.update({ telefone_contratante: telefone_contratante}, {
            where: {
              id: id
            }
          });
          
          return res.send({contratante,token:generateToken({id:contratante.id})});
    },
    async getAll(req,res){
        
        const contratante = await contratante.findAll()
        
        return res.json(contratante);
        
        
    },
}