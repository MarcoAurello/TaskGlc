import { Model, DataTypes } from 'sequelize'
import connection from './connection'
import { uuid } from 'uuidv4'
import Mensagem from './mensagem.model'
import Atividade from './atividade.model'

class BibliotecaDeErros extends Model {
  public id!: string
  public fkAtividade!: string
  public fkDercricaoErro!: string
  public Solucao!: string
  public Atividade

  public createdAt!: Date
  public updatedAt!: Date
}

BibliotecaDeErros.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fkAtividade: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  fkDercricaoErro: {
    type: DataTypes.UUID,
    allowNull: false,
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
  tableName: 'bibliotecaDeErros',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

BibliotecaDeErros.belongsTo(Atividade, { foreignKey: 'fkAtividade' })
BibliotecaDeErros.belongsTo(Mensagem, { foreignKey: 'fkDercricaoErro' })
export default BibliotecaDeErros
