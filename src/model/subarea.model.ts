import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'
import Area from './area.model'

class SubArea extends Model {
  public id!: string
  public nome!: string
  public descricao!: string
  public fkArea!: string
  public createdAt!: Date
  public updatedAt!: Date
  public Area!: Area
}

SubArea.init({
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
  fkArea: {
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
  tableName: 'subarea',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

// Area.belongsTo(Area, { foreignKey: 'fkArea' })

export default SubArea
