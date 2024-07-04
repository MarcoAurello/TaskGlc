
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

    // const perfilsAdministrador = await queryInterface.sequelize.query('select * from perfil where nome = \'Administrador\'')
    // const perfilAdministradorRows = perfilsAdministrador[0]

    const perfilAdm = await queryInterface.sequelize.query('select * from perfil where nome = \'Administrador\'')
    const perfilAdmRows = perfilAdm[0]

    
    const perfilsGerente = await queryInterface.sequelize.query('select * from perfil where nome = \'Gerente\'')
    const perfilGerenteRows = perfilsGerente[0]

    const areas = await queryInterface.sequelize.query('select * from area where nome = \'Sistemas - Desenvolvimento\'')
    const areasSuporte = await queryInterface.sequelize.query('select * from area where nome = \'Suporte e Infraestrutura\'')
    const areaDep = await queryInterface.sequelize.query('select * from area where nome = \'Administrativo\'')
    
    const areasGPC = await queryInterface.sequelize.query('select * from area where nome = \'Desenvolvimento de Pessoas\'')
    const areaGSI = await queryInterface.sequelize.query('select area.* from area inner join unidade on unidade.id=area.fkUnidade where unidade.nome = \'GSI\' and area.nome = \'Trasnsporte\'')

    await queryInterface.bulkInsert('usuario', [
      {
        id: uuid(),
        nome: 'funcionario gti1',
        email: 'gti1@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
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
    await queryInterface.bulkDelete('usuario', null, {})
  }
}