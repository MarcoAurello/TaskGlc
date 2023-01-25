import { Model, DataTypes } from 'sequelize'
import connection from './connection'
import { uuid } from 'uuidv4'

class Usuario extends Model {
  public id!: string
  public nome!: string
  public email!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Usuario.init({
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'O campo email deve ser preenchido corretamente.'
      },
      notEmpty: {
        msg: 'O campo email deve ser preenchido corretamente.'
      }
    }
  }
}, {
  sequelize: connection,
  tableName: 'usuario',
  hooks: {
    async beforeSave (instance) {
      console.log(uuid())
      instance.id = uuid()
    }
  }
})

export default Usuario
