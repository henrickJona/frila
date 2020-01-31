'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('termoCompromissos', { 
        
        id: {
          type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,

        }, 
        data_inicio: {
          type: Sequelize.DATE,
          allowNull: false,

        },
        data_fim: {
          type: Sequelize.DATE,
          allowNull: false,

        },
        valor_total:{ 
          type:Sequelize.DECIMAL(10,2),
          allowNull:false,
        },
        avaliacao_dada_pelo_contratante:{ 
          type:Sequelize.DOUBLE,
          allowNull:false,
        },
        avaliacao_dada_pelo_autonomo:{ 
          type:Sequelize.DOUBLE,
          allowNull:false,
        },
        fk_anuncio_id: {
          type: Sequelize.INTEGER,
          references: { model: 'anuncios', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull:false,
          
        },
        fk_autonomo_id: {
          type: Sequelize.INTEGER,
          references: { model: 'autonomos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull:false,
          
        },
        fk_contratante_id: {
          type: Sequelize.INTEGER,
          references: { model: 'contratantes', key: 'id'},
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
    
      return queryInterface.dropTable('termoCompromissos');
    
  }
};
