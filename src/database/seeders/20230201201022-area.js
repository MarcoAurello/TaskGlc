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
    const unidadeGercom = await queryInterface.sequelize.query('select * from unidade where nome = \'Gercom\'')
    const unidadeDep = await queryInterface.sequelize.query('select * from unidade where nome = \'DEP\'')
    const unidades = await queryInterface.sequelize.query('select * from unidade where nome = \'GTI\'')
    const unidadeGPC = await queryInterface.sequelize.query('select * from unidade where nome = \'GPC\'')
    const unidadeGSI = await queryInterface.sequelize.query('select * from unidade where nome = \'GSI\'')
    await queryInterface.bulkInsert('area', [{
      id: uuid(),
      nome: 'Sistemas - Desenvolvimento',
      fkUnidade: unidades[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuid(),
      nome: 'Sistemas - Suporte',
      fkUnidade: unidades[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      nome: 'Jornalismo',
      fkUnidade: unidadeGercom[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      nome: 'Design / web Design',
      fkUnidade: unidadeGercom[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      nome: 'Eventos',
      fkUnidade: unidadeGercom[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // {
    //   id: uuid(),
    //   nome: 'Infraestrutura',
    //   fkUnidade: unidades[0][0].id,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    {
      id: uuid(),
      nome: 'Departamento de Pessoal',
      fkUnidade: unidadeGPC[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      nome: 'Desenvolvimento de Pessoas',
      fkUnidade: unidadeGPC[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      nome: 'Trasnsporte',
      fkUnidade: unidadeGSI[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      nome: 'Elétrica',
      fkUnidade: unidadeGSI[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Hidraulica',
      fkUnidade: unidadeGSI[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Refrigeração',
      fkUnidade: unidadeGSI[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Arquitetura',
      fkUnidade: unidadeGSI[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Gerência Academica',
      fkUnidade: unidadeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Copeg',
      fkUnidade: unidadeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Biblioteca',
      fkUnidade: unidadeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'Atendimento',
      fkUnidade: unidadeDep[0][0].id,
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
    await queryInterface.bulkDelete('area', null, {})
  }
}
