"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _uuidv4 = require('uuidv4');
var _mensagemmodel = require('./mensagem.model'); var _mensagemmodel2 = _interopRequireDefault(_mensagemmodel);
var _atividademodel = require('./atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);

class BibliotecaDeErros extends _sequelize.Model {
  
  
  
  
  

  
  
}

BibliotecaDeErros.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fkAtividade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
  },
  fkDercricaoErro: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
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
  tableName: 'bibliotecaDeErros',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

BibliotecaDeErros.belongsTo(_atividademodel2.default, { foreignKey: 'fkAtividade' })
BibliotecaDeErros.belongsTo(_mensagemmodel2.default, { foreignKey: 'fkDercricaoErro' })
exports. default = BibliotecaDeErros
