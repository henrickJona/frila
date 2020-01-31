'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('qualificacaos', { 
        id:{ 
          type:Sequelize.INTEGER,
          primaryKey:true,
          allowNull:false,
          autoIncrement:true,

        }, 
        nome_escola_qualificacao:{ 
          type:Sequelize.STRING,
          
          allowNull:false,
          
          
        }, 
        curso_qualificacao:{ 
          type:Sequelize.STRING,
          
          allowNull:false,
          
          
        }, 
        duracao_qualificacao:{ 
          type:Sequelize.STRING,
          
          allowNull:false,
          
          
        },
        
        fk_autonomo_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'autonomos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('qualificacaos');
    
  }
};
