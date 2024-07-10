"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _uuidv4 = require('uuidv4');
var _connection = require('./connection'); var _connection2 = _interopRequireDefault(_connection);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _perfilmodel = require('./perfil.model'); var _perfilmodel2 = _interopRequireDefault(_perfilmodel);
var _areamodel = require('./area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);

class Usuario extends _sequelize.Model {
  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

   generateToken () {
    return _jsonwebtoken2.default.sign({ id: this.id }, 'c43e4311194ab5795eaf4db533b8172d')
  }
}

Usuario.init({
  id: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
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
        const registros = await Usuario.findAll({ where: { email: value } })
        if (registros.length > 0) {
          throw new Error('Já existe um usuário utilizando este e-mail.')
        }
      }
    }
  },
  passwordHash: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: _sequelize.DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo senha deve ser preenchido corretamente.'
      },
      notEmpty: {
        msg: 'O campo senha deve ser preenchido corretamente.'
      }
    }
  },
  telefone: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  chapa: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  demandante: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ativo: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  primeiroLogin: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  fkPerfil: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true
  },
  fkArea: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true
  },
  validado: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  fkValidador: {
    type: _sequelize.DataTypes.UUID,
    allowNull: true
  }
}, {
  sequelize: _connection2.default,
  tableName: 'usuario',
  hooks: {
    async beforeCreate (instance) {
      instance.id = _uuidv4.uuid.call(void 0, )
      instance.passwordHash = await _bcryptjs2.default.hash(instance.password, 8)
    }
  }
})

Usuario.belongsTo(_areamodel2.default, { foreignKey: 'fkArea' })
Usuario.belongsTo(_perfilmodel2.default, { foreignKey: 'fkPerfil' })

exports. default = Usuario
