
'use strict'

const bcrypt = require('bcrypt')
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

    const perfils = await queryInterface.sequelize.query('select * from perfil where nome = \'Administrador\'')
    const perfilRows = perfils[0]

    const areas = await queryInterface.sequelize.query('select * from area where nome = \'Sistemas - Desenvolvimento\'')

    await queryInterface.bulkInsert('usuario', [{
      id: uuid(),
      nome: 'Diego Alisson Monteiro',
      email: 'diegoalisson@pe.senac.br',
      passwordHash: await bcrypt.hash('gti@2021', 8),
      telefone: '34132053',
      chapa: '15385-F1',
      demandante: true,
      fkPerfil: perfilRows[0].id,
      fkArea: areas[0][0].id,
      validado: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('usuario', null, {})
  }
}
