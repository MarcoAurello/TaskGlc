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
    await queryInterface.bulkInsert('unidade', [
      {
        id: uuid(),
        nome: 'GTI',
        receber: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'GPC',
        receber: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UIS',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Gercom',
        receber: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'GPG',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DEP',
        receber: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'GCF',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DR',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DAF',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'CAS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'DPE',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UEP-REC',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UHT',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'GLC',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'GSI',
        receber: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UEP-Petrolina',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        id: uuid(),
        nome: 'UEP-Caruaru',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UEP-Vitoria',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UEP-Serra Talhada',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UEP-Paulista',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Comercial',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UEP-Garanhuns',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Faculdade',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'UIP',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'CETII',
        receber: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('unidade', null, {})
  }
}
