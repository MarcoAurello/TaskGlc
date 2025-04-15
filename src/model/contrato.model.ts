import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'
import Unidade from './unidade.model'

class Contrato extends Model {
  public id!: string
  public nomeEmpresa!: string
  public descricao!: string
  public parcelas!: string
  public fkUnidade!: string
  public inicioVigencia!: Date
  public finalVigencia!: Date
  public valorContrato!: number

  public createdAt!: Date
  public updatedAt!: Date
  public Unidade!: Unidade
}

Contrato.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nomeEmpresa: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: true
  },
  parcelas: {
    type: DataTypes.STRING,
    allowNull: true
  },

  valorContrato: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {
        msg: 'O campo valorContrato deve ser um número válido.'
      }
    }
  },

  inicioVigencia: {
    type: DataTypes.DATE,
    allowNull: true
  },

  finalVigencia: {
    type: DataTypes.DATE,
    allowNull: true
  },


  fkUnidade: {
    type: DataTypes.UUID,
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
  sequelize: connection,
  tableName: 'contrato',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

Contrato.belongsTo(Unidade, { foreignKey: 'fkUnidade' })
Unidade.hasMany(Contrato, { foreignKey: 'fkUnidade' })

export default Contrato
