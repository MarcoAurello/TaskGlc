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
    await queryInterface.createTable('mensagem', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      conteudo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fkAtividade: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fkUsuario: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('mensagem')
  }
}
