"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);

class Email extends _sequelize.Model {
  

  

  

  

  
}

Email.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'O campo email deve ser preenchido corretamente.'
      },
      notEmpty: {
        msg: 'O campo email deve ser preenchido corretamente.'
      },
      isEmail: {
        msg: 'O campo email deve ser preenchido corretamente.'
      },
      async isUnique (value) {
        const registros = await Email.findAll({ where: { email: value } })
        if (registros.length > 0) {
          throw new Error('Usuário já preencheu a pesquisa.')
        }
      }
    }
  },

}, {
  sequelize: _connection2.default,
  tableName: 'email',
  hooks: {
    async beforeValidate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
    }
  }
})

exports. default = Email
