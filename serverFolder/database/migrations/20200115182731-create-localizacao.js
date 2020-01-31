'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('localizacaos', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
        },
        latitude: {
          type: Sequelize.STRING,
          
          allowNull:false,
          
        },
        longitude: {
          type: Sequelize.STRING,
          
          allowNull:false,
          
        },
        fk_anuncio_id: {
          type: Sequelize.INTEGER,
          references: { model: 'anuncios', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull:false,
          
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
    
      return queryInterface.dropTable('localizacaos');
    
  }
};
