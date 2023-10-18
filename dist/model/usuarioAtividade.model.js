"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _atividademodel = require('./atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);

class UsuarioAtividade extends _sequelize.Model {
  

  

  
  

  

  
}

UsuarioAtividade.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fkUsuario: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  fkAtividade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  ativo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false

  }
}, {
  sequelize: _connection2.default,
  tableName: 'usuarioAtividade',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

UsuarioAtividade.belongsTo(_usuariomodel2.default, { foreignKey: 'fkUsuario' })
UsuarioAtividade.belongsTo(_atividademodel2.default, { foreignKey: 'fkAtividade' })

exports. default = UsuarioAtividade
