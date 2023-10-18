"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _uuidv4 = require('uuidv4');
var _usuariomodel = require('./usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);

class Questionario extends _sequelize.Model {
  
  
  
  
  
  
  
  
  
  
  
 
  
  

  
  


}

Questionario.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  pergunta1: {
    type: _sequelize.DataTypes.NUMBER,
    allowNull: false,

  },

  pergunta2: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false,

  },
  pergunta3: {
    type: _sequelize.DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta4: {
    type: _sequelize.DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta5: {
    type: _sequelize.DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta6: {
    type: _sequelize.DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta7: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false,

  },
  pergunta8: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false,

  },
  score: {
    type: _sequelize.DataTypes.NUMBER,
    allowNull: false,

  },

  

  fkUsuario: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,

  }
}, {
  sequelize: _connection2.default,
  tableName: 'questionario',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

Questionario.belongsTo(_usuariomodel2.default, { foreignKey: 'fkUsuario' })

exports. default = Questionario
