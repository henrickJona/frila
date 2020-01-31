const{Model, DataTypes} =require('sequelize');

class Anuncio extends Model{
    static init(sequelize){
        super.init({
            titulo_anuncio: DataTypes.STRING,
            descricao_anuncio: DataTypes.STRING,
            valor_maximo_anuncio: DataTypes.DECIMAL(10,2),
            anexo_anuncio: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
            avaliacao_contratante: DataTypes.DOUBLE,
        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Contratante, {foreignKey: 'fk_contratante_id', as: 'contratante'});
        


    }
}
module.exports = Anuncio;