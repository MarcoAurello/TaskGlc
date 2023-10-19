"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _classificacaomodel = require('./classificacao.model'); var _classificacaomodel2 = _interopRequireDefault(_classificacaomodel);
var _areamodel = require('./area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);
var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _statusmodel = require('./status.model'); var _statusmodel2 = _interopRequireDefault(_statusmodel);


class Atividade extends _sequelize.Model {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
}

Atividade.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  protocolo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  fkClassificacao: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true
  },
  fkArea: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  fkStatus: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  pessoal: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  fkUsuarioSolicitante: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  fkUsuarioExecutor: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true
  },
  categoria: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  caminho: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  tempoEstimado: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  arquivado: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: true
  },
  ordem: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
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
  tableName: 'atividade',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

Atividade.belongsTo(_classificacaomodel2.default, { foreignKey: 'fkClassificacao' })

Atividade.belongsTo(_usuariomodel2.default, { foreignKey: 'fkUsuarioSolicitante' })
Atividade.belongsTo(_usuariomodel2.default, { foreignKey: 'fkUsuarioExecutor', as: 'UsuarioExecutor' })
Atividade.belongsTo(_statusmodel2.default, { foreignKey: 'fkStatus' })
Atividade.belongsTo(_areamodel2.default, { foreignKey: 'fkArea' })

exports. default = Atividade