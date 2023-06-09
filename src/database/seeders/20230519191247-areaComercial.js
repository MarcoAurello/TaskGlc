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
    
   
    // const unidade = await queryInterface.sequelize.query('select * from unidade where nome = \'Comercial\'')
  
 



    await queryInterface.bulkInsert('area', [
      
      {
        id: uuid(),
        nome: 'Manutenção - Hidráulica',
        fkUnidade: '2ce4e1c8-790d-4154-9a95-509183a1889e',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: uuid(),
        nome: 'Manutenção - Refrigeração',
        fkUnidade: '2ce4e1c8-790d-4154-9a95-509183a1889e',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: uuid(),
        nome: 'Manutenção - Mecânica',
        fkUnidade: '2ce4e1c8-790d-4154-9a95-509183a1889e',
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
