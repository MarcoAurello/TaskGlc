
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
    const areasSuporte = await queryInterface.sequelize.query('select * from area where nome = \'Sistemas - Suporte\'')
    const areaDep = await queryInterface.sequelize.query('select * from area where nome = \'Atendimento\'')
    
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
      {
        id: uuid(),
        nome: 'funcionario gti2',
        email: 'gti2@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'funcionario gti3',
        email: 'gti3@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),
        nome: 'Marco Aurellio',
        email: 'marconunes@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2023', 8),
        telefone: '34132053',
        chapa: '15812-F1',
        demandante: true,
        fkPerfil: perfilAdmRows[0].id,
        fkArea: areas[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Graça Bezerra',
        email: 'graca@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        telefone: '34132053',
        chapa: '15385-F1',
        demandante: true,
        fkPerfil: perfilGerenteRows[0].id,
        fkArea: areas[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Betânia',
        email: 'betania@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        telefone: '34132053',
        chapa: '15385-F1',
        demandante: true,
        fkPerfil: perfilGerenteRows[0].id,
        fkArea: areaDep[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Andre Jar',
        email: 'andre@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        telefone: '34132053',
        chapa: '15385-F1',
        demandante: true,
        fkPerfil: perfilGerenteRows[0].id,
        fkArea: areasSuporte[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Marcio Angelo',
        email: 'marcio@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        telefone: '34132053',
        chapa: '15385-F1',
        demandante: true,
        fkPerfil: perfilGerenteRows[0].id,
        fkArea: areas[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: ' Renata Amorin',
        email: 'marco.nunes.senac@gmail.com',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        telefone: '34132053',
        chapa: '15385-F1',
        demandante: true,
        fkPerfil: perfilGerenteRows[0].id,
        fkArea: areasGPC[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Usuario teste rh2',
        email: 'marco-aurellio@hotmail.com',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),
        nome: 'Usuario teste rh3',
        email: 'grh1@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Usuario teste gsi- Eletrica',
        email: 'gsi2@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Usuario teste gsi- Transporte',
        email: 'gsi3@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        validado: false,
        ativo: true,
        demandante: false,
        primeiroLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Ana Claudia',
        email: 'gsi@pe.senac.br',
        passwordHash: await bcrypt.hash('gti@2021', 8),
        telefone: '3413yyy63',
        chapa: '154545585-F1',
        demandante: true,
        fkPerfil: perfilGerenteRows[0].id,
        fkArea: areaGSI[0][0].id,
        validado: true,
        ativo: true,
        primeiroLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

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