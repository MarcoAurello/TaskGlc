"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _uuidv4 = require('uuidv4');

var _atividademodel = require('./atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);
var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _statusmodel = require('./status.model'); var _statusmodel2 = _interopRequireDefault(_statusmodel);

class TimeLineStatus extends _sequelize.Model {
  

 
 
  
  
  
 
 
  
  
  
  
  
}

TimeLineStatus.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },

  fkStatus: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
   
  },
  fkUsuario: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
   
  },
  fkAtividade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
   
  },


}, {
  sequelize: _connection2.default,
  tableName: 'timeLineStatus',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})





TimeLineStatus.belongsTo(_atividademodel2.default, { foreignKey: 'fkAtividade' })

TimeLineStatus.belongsTo(_usuariomodel2.default, { foreignKey: 'fkUsuario' })
TimeLineStatus.belongsTo(_statusmodel2.default, { foreignKey: 'fkStatus' })

exports. default = TimeLineStatus
