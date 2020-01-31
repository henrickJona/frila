const{Model, DataTypes} =require('sequelize');

class Contratante extends Model{
    static init(sequelize){
        super.init({
            nome_contratante: DataTypes.STRING,
            sobrenomo_contratante: DataTypes.STRING,
            foto_perfil_autonomo: DataTypes.STRING,
            email_contratante: DataTypes.STRING,
            avaliacao_contratante: DataTypes.STRING,
            telefone_contratante: DataTypes.STRING,
            valor_investido_contratante: DataTypes.DECIMAL(10,2),

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.hasMany(models.Anuncio, {foreignKey: 'fk_contratante_id', as: 'anuncios'});
        


    }
}
module.exports = Contratante;