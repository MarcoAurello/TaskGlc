import { DataTypes, Model } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'
import Usuario from './usuario.model'

class Mensagem extends Model {
  public id!: string
  public conteudo!: string
  public fkAtividade!: string
  public fkUsuario!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Mensagem.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fkAtividade: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fkUsuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize: connection,
  tableName: 'mensagem',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

Mensagem.belongsTo(Usuario, { foreignKey: 'fkUsuario' })

export default Mensagem
