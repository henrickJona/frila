'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('interessados', { 
          id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
            
          },
          nome_autonomo: {
            type: Sequelize.STRING,
            allowNull:false,
                        
          },
          avaliacao_autonomo: {
            type: Sequelize.DOUBLE,
            allowNull:false,
                        
          },
          foto_perfil_autonomo: {
            type: Sequelize.STRING,
            allowNull:false,
                        
          },
          fk_anuncio_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references: { model: 'anuncios', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          fk_autonomo_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
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
    
      return queryInterface.dropTable('interessados');
    
  }
};
