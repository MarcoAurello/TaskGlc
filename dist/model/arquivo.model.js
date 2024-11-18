"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _uuidv4 = require('uuidv4');

class Arquivo extends _sequelize.Model {
  
  
  
  
  
  
  
  
}

Arquivo.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
  },
  nomeApresentacao: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
  },
  caminho: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
  },
  hash: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
  },
  fkAtividade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize: _connection2.default,
  tableName: 'arquivo',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

exports. default = Arquivo
