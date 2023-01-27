import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'

class Area extends Model {
  public id!: string
  public nome!: string
  public descricao!: string
  public fkUnidade!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Area.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
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
  fkUnidade: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  sequelize: connection,
  tableName: 'area',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

export default Area
