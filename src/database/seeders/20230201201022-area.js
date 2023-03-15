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

    const unidades = await queryInterface.sequelize.query('select * from unidade where nome = \'Gerência de Tecnologia da Informação\'')
    const unidadeGPC = await queryInterface.sequelize.query('select * from unidade where nome = \'Gerência de Pessoas e Cultura\'')
    const unidadeGSI = await queryInterface.sequelize.query('select * from unidade where nome = \'Gerência de Serviços e infra Estrutura\'')
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
    // {
    //   id: uuid(),
    //   nome: 'Infraestrutura',
    //   fkUnidade: unidades[0][0].id,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    {
      id: uuid(),
      nome: 'Coordenação de Pessoal',
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
