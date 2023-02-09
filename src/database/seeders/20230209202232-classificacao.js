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
    await queryInterface.bulkInsert('classificacao', [
      { id: uuid(), nome: 'Urgente', descricao: 'Atividades onde o tempo está curto ou acabou.' },
      { id: uuid(), nome: 'Importante', descricao: 'Atividades que trazem resultado no curto, médio ou longo prazo.' },
      { id: uuid(), nome: 'Ciscunstancial', descricao: 'Tarfas desnecessárias feitas por comodidade ou por serem socialmente apropriadas.' }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('classificacao', null, {})
  }
}
