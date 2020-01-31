const{Model, DataTypes} =require('sequelize');

class Interessados extends Model{
    static init(sequelize){
        super.init({
            nome_autonomo: DataTypes.STRING,
            avaliacao_autonomo: DataTypes.DOUBLE,
            foto_perfil_autonomo: DataTypes.STRING,
            

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_anuncio_id', as: 'anuncio'});
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_autonomo_id', as: 'autonomo'});


    }
}
module.exports = Interessados;