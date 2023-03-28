'use strict'

const { uuid } = require('uuidv4')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
    const unidadeUIS = await queryInterface.sequelize.query('select * from unidade where nome = \'UIS\'')
    const unidadeCAS = await queryInterface.sequelize.query('select * from unidade where nome = \'CAS\'')
    const unidadeREC = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-REC\'')
    const unidadeUHT = await queryInterface.sequelize.query('select * from unidade where nome = \'UHT\'')
    const unidadePet = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-Petrolina\'')
    const unidadeCar = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-Caruaru\'')
    const unidadeVit = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-Vitoria\'')
    const unidadeSerra = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-Serra Talhada\'')
    const unidadePaul = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-Paulista\'')
    const unidadegar = await queryInterface.sequelize.query('select * from unidade where nome = \'UEP-Garanhuns\'')
    const unidadeFac = await queryInterface.sequelize.query('select * from unidade where nome = \'Faculdade\'')
    const unidadeUIP = await queryInterface.sequelize.query('select * from unidade where nome = \'UIP\'')
    const unidadecet = await queryInterface.sequelize.query('select * from unidade where nome = \'CETII\'')



    await queryInterface.bulkInsert('area', [
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadecet[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeUIP[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeFac[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadegar[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadePaul[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeSerra[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeVit[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeCar[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadePet[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeUHT[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeREC[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Atendimento',
        fkUnidade: unidadeCAS[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      {
        id: uuid(),
        nome: 'Educacional',
        fkUnidade: unidadeUIS[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Sistemas - Desenvolvimento',
        fkUnidade: unidades[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: uuid(),
        nome: 'Suporte e Infraestrutura',
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
        nome: 'Regulação',
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
        nome: 'Administrativo',
        fkUnidade: unidadeDep[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: uuid(),
        nome: 'Processos',
        fkUnidade: unidadeDep[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: uuid(),
        nome: 'Equipe Técnica',
        fkUnidade: unidadeDep[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: uuid(),
        nome: 'NEAD',
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
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('area', null, {})
  }
}
