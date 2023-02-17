import { Model, DataTypes } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'
import Usuario from './usuario.model'
import Atividade from './atividade.model'

class UsuarioAtividade extends Model {
  public id!: string

  public fkUsuario!: string

  public fkAtividade!: string
  public ativo !: Boolean

  public createdAt!: Date

  public updatedAt!: Date
}

UsuarioAtividade.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fkUsuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fkAtividade: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ativo: {
    type: DataTypes.STRING,
    allowNull: false

  }
}, {
  sequelize: connection,
  tableName: 'usuarioAtividade',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

UsuarioAtividade.belongsTo(Usuario, { foreignKey: 'fkUsuario' })
UsuarioAtividade.belongsTo(Atividade, { foreignKey: 'fkAtividade' })

export default UsuarioAtividade
