"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

class ConfiguracaoGeral extends _sequelize.Model {
  
  
  
  
  
  
  
  

  
  
  
  

  
  
}

ConfiguracaoGeral.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  autenticacaoAd: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 1
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  host: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  porta: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  ssl: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  template: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  urlAd: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  baseDN: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  usernameAd: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  passwordAd: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: _connection2.default,
  tableName: 'configuracaoGeral'
})

exports. default = ConfiguracaoGeral
