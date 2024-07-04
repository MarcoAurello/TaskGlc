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
        type: Sequelize.STRING,
        allowNull: false
      },
      protocolo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      forma: {
        type: Sequelize.STRING,
        allowNull: true
      },
      medida: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cor: {
        type: Sequelize.STRING,
        allowNull: true
      },

      indicacao: {
        type: Sequelize.STRING,
        allowNull: true
      },

      informacoes:  {
        type: Sequelize.STRING,
        allowNull: true
      }, 

      material: {
        type: Sequelize.STRING,
        allowNull: true
      },

      eletro: {
        type: Sequelize.STRING,
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
      
      dimensao: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
