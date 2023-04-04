const Sequelize = require('sequelize')

require('dotenv').config({ path: process.env.DEVMODE?.trim() === 'test' ? '.env.test' : '.env' })

// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PWD, {
//   host: process.env.SERVER,
//   dialect: process.env.DIALECT,
//   logging: false
// })

const sequelize = new Sequelize('TaskManager', 'sa', 'local', {
  host: '10.9.8.15',
  dialect: 'mssql',
  logging: false
})

export default sequelize
