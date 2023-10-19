"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);

class Mensagem extends _sequelize.Model {
  
  
  
  
  
  
}

Mensagem.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  conteudo: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  fkAtividade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  fkUsuario: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize: _connection2.default,
  tableName: 'mensagem',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

Mensagem.belongsTo(_usuariomodel2.default, { foreignKey: 'fkUsuario' })

exports. default = Mensagem
