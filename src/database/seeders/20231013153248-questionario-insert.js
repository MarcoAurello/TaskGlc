
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

    // const perfilsAdministrador = await queryInterface.sequelize.query('select * from perfil where nome = \'Administrador\'')
    // const perfilAdministradorRows = perfilsAdministrador[0]

    const usuario = await queryInterface.sequelize.query('select * from usuario where nome = \'Marco Aurellio\'')
  
  
    await queryInterface.bulkInsert('questionario', [
 
      {
        id: uuid(),
        pergunta1: 5,
        pergunta2: 'fsrghrhtrh',
        pergunta3: 5,
        pergunta4: 5,
        pergunta5: 5,
        pergunta6: 5,
        pergunta7: "faefaeFE",
        pergunta8: "asfadf",
        score: 5,
   
        fkUsuario: usuario[0][0].id,
       
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
    await queryInterface.bulkDelete('questionario', null, {})
  }
}