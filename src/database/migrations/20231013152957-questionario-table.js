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
    await queryInterface.createTable('questionario', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      pergunta1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pergunta2: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pergunta3: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pergunta4: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pergunta5: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pergunta6: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pergunta7: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pergunta8: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('questionario')
  }
}
