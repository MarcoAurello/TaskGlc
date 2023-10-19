"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

class Unidade extends _sequelize.Model {
  
  
  
  
  
  
}

Unidade.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'O campo nome deve ser preenchido corretamente.'
      },
      notEmpty: {
        msg: 'O campo nome deve ser preenchido corretamente.'
      },
      async isUnique (value) {
        const registro = await Unidade.findAll({ where: { nome: value } })
        if (registro.length > 0) {
          throw new Error('Já existe uma unidade cadastrada com este nome.')
        }
      }
    }
  },
  descricao: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  receber: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  sequelize: _connection2.default,
  tableName: 'unidade',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

exports. default = Unidade
