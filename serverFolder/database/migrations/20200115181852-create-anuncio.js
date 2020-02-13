'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('anuncios', {
        id: { 
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
        }, 
        titulo_anuncio: { 
          type: Sequelize.STRING,
          allowNull:false,
          
        },
        descricao_anuncio: { 
          type: Sequelize.STRING,
          allowNull:false,
        
        },  
        valor_maximo_anuncio: { 
          type: Sequelize.DECIMAL(10,2),
          allowNull:false,
      
        },
        anexo_anuncio: { 
          type: Sequelize.STRING,
          allowNull:true,
      
        },
        ativo: { 
          type: Sequelize.BOOLEAN,
          allowNull:false,
          defautlValue:true
        },
        avaliacao_contratante: { 
          type: Sequelize.DOUBLE,
          allowNull:false,
          
        },
        fk_contratante_id: { 
          type: Sequelize.INTEGER,
          allowNull:false,
          references: { model: 'contratantes', key: 'id'},
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
    
      return queryInterface.dropTable('anuncios');
    
  }
};
