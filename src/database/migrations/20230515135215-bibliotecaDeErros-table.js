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
    await queryInterface.createTable('bibliotecaDeErros', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
   
      fkAtividade: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fkDercricaoErro: {
        type: Sequelize.UUID,
        allowNull: false
      },
      solucao: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('bibliotecaDeErros')
  }
}
