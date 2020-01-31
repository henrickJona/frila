'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('autonomos', { 
        id:{ 
          type:Sequelize.INTEGER,
          primaryKey:true,
          allowNull:false,
          autoIncrement:true
        },
        nome_autonomo:{ 
          type:Sequelize.STRING,
          allowNull:false,
          
        },
        sobrenome_autonomo:{ 
          type:Sequelize.STRING,
          allowNull:false,
        },
        foto_perfil_autonomo:{ 
          type:Sequelize.STRING,
          allowNull:false,
        },
        email_autonomo:{
          type:Sequelize.STRING,
          allowNull:false,

        },
        avaliacao_autonomo:{ 
          type:Sequelize.DOUBLE,
          allowNull:false,
        },
        telefone_autonomo:{ 
          type:Sequelize.STRING,
          allowNull:false,
        },
        valor_ganho_autonomo:{ 
          type:Sequelize.DECIMAL(10,2),
          allowNull:false,
        },
        notificado_autonomo:{ 
          type:Sequelize.BOOLEAN,
          allowNull:false,
          defaultValue:true
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
    
      return queryInterface.dropTable('autonomos');
    
  }
};
