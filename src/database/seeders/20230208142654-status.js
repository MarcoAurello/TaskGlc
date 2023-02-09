'use strict'
const { uuid } = require('uuidv4')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('status', [
      { id: uuid(), nome: 'Aberto', createdAt: new Date(), updatedAt: new Date() },
      { id: uuid(), nome: 'Planejado para Iniciar', createdAt: new Date(), updatedAt: new Date() },
      { id: uuid(), nome: 'Iniciado', createdAt: new Date(), updatedAt: new Date() },
      { id: uuid(), nome: 'Cancelado', createdAt: new Date(), updatedAt: new Date() },
      { id: uuid(), nome: 'Concluido', createdAt: new Date(), updatedAt: new Date() },
      { id: uuid(), nome: 'Pendente', createdAt: new Date(), updatedAt: new Date() },
      { id: uuid(), nome: 'Parado', createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('status', null, {})
  }
}
