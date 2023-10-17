import { Model, DataTypes } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'

class Email extends Model {
  public id!: string

  public nome!: string

  public email!: string

  public createdAt!: Date

  public updatedAt!: Date
}

Email.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
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
  sequelize: connection,
  tableName: 'email',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

export default Email
