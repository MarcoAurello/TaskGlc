'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('atividade', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      titulo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      protocolo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      centroCusto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      forma: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      medida: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cor: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      indicacao: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      informacoes:  {
        type: Sequelize.TEXT,
        allowNull: true
      }, 

      material: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      eletro: {
        type: Sequelize.TEXT,
        allowNull: true
      },


      fkClassificacao: {
        type: Sequelize.UUID,
        allowNull: true
      },
      fkArea: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fkStatus: {
        type: Sequelize.UUID,
        allowNull: false
      },
      pessoal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      editar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      
      dimensao: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      detalhes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      fkUsuarioSolicitante: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fkUsuarioExecutor: {
        type: Sequelize.UUID,
        allowNull: true
      },
      categoria: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      caminho: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tempoEstimado: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      arquivado: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      ordem: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('atividade')
  }
}
