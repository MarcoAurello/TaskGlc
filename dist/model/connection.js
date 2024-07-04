"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }const Sequelize = require("sequelize");

require("dotenv").config({
  path: _optionalChain([process, 'access', _ => _.env, 'access', _2 => _2.DEVMODE, 'optionalAccess', _3 => _3.trim, 'call', _4 => _4()]) === "test" ? ".env.test" : ".env",
});

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PWD, {
  host: process.env.SERVER,
  dialect: process.env.DIALECT,
  logging: false
})

// const sequelize = new Sequelize("TaskManagerGlc", "sa", "local", {
//   host: "10.9.8.74",
//   dialect: "mssql",
//   logging: false,
//   dialectOptions: {
//     timezone: "America/Sao_Paulo",
//   },
// });

// const sequelize = new Sequelize('Tasktest', 'sa', 'local', {
//   host: '10.9.8.20',
//   dialect: 'mssql',
//   logging: false,
//   dialectOptions: {
//     timezone: 'America/Sao_Paulo'
//   }

// })

exports. default = sequelize;
