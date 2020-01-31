'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('contratantes', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,

        },
        nome_contratante:{
          type:Sequelize.STRING,
          allowNull:false,

        },
        sobre_nome_contratante:{
          type:Sequelize.STRING,
          allowNull:false,

        },
        telefone_contratante:{
          type:Sequelize.STRING,
          allowNull:false,

        },
        email_contratante:{
          type:Sequelize.STRING,
          allowNull:false,

        },
        foto_perfil_contratante:{
          type:Sequelize.STRING,
          allowNull:true,

        },
        valor_investido_contratante:{
          type:Sequelize.DECIMAL(10,2),
          allowNull:false,

        },
        avaliacao_contratante:{
          type:Sequelize.DOUBLE,
          allowNull:false,

        },
        created_at:{
          type:Sequelize.DATE,
          allowNull:false,

        },
        updated_at:{
          type:Sequelize.DATE,
          allowNull:false,

        },

      
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('contratantes');
    
  }
};
