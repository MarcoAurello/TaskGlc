"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

var _uuidv4 = require('uuidv4');
var _unidademodel = require('./unidade.model'); var _unidademodel2 = _interopRequireDefault(_unidademodel);

class Area extends _sequelize.Model {
  
  
  
  
  
  
  
}

Area.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo nome deve ser preenchido corretamente.'
      },
      notEmpty: {
        msg: 'O campo nome deve ser preenchido corretamente.'
      }
    }
  },
  descricao: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  fkUnidade: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo unidade deve ser preenchido corretamente.'
      },
      notEmpty: {
        msg: 'O campo unidade deve ser preenchido corretamente.'
      }
    }
  }
}, {
  sequelize: _connection2.default,
  tableName: 'area',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

Area.belongsTo(_unidademodel2.default, { foreignKey: 'fkUnidade' })

exports. default = Area
