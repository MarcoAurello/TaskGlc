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
      fkUsuarioSolicitante: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fkUsuarioExecutor: {
        type: Sequelize.UUID,
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
