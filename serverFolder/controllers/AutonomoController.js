const Autonomo = require('../models/Autonomo');
const authConfig = require('../config/auth');

module.exports = {
    
    async getOne(req,res){
        const  {id} = req.params;
        
        const autonomo = await Autonomo.findOne({ where: { id: id } })
        if(!autonomo){
            return res.status(400).json({error:'User not found'})
        }else{
            return res.json(autonomo);
        }
        
    },

    async storeByFacebookApi(req, res){
        const {nome_autonomo,sobrenome_autonomo, foto_perfil_autonomo, email_autonomo} = req.body;
        
        const autonomo = await Autonomo.findOrCreate({where :{email_autonomo:email_autonomo}, defaults:{nome_autonomo,sobrenome_autonomo,foto_perfil_autonomo,email_autonomo,
            telefone_autonomo:'teste',valor_ganho_autonomo:0.0,notificado_autonomo:true,avaliacao_autonomo:1}})
       
        return res.json(autonomo);
        
    },
    async storeNumber(req, res){
        const  {id} = req.params;
        const   {telefone_autonomo} = req.body;
        console.log(id)
        console.log(telefone_autonomo)
        const autonomo = await Autonomo.update({ telefone_autonomo: telefone_autonomo}, {
            where: {
              id: id
            }
          });
          
          return res.json(autonomo)
    },
    async getAll(req,res){
        
        const autonomo = await Autonomo.findAll()
        
        return res.json(autonomo);
        
        
    },
    async Authenticate(req, res){
        const {email} = req.body
        const autonomo = await Auntonomo.findOne({email});
        if(!autonomo){
            return res.status(400).send({error: 'Usuário não Encontrado!'})
        }
    }
    
    
}