import { DataTypes, Model } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'
import Classificacao from './classificacao.model'
import Area from './area.model'
import Usuario from './usuario.model'
import Status from './status.model'

class Atividade extends Model {
  public id!: string
  public titulo!: string
  public protocolo!: string
  public fkClassificacao!: string
  public fkArea!: string
  public fkStatus!: string
  public pessoal!: Boolean
  public fkUsuarioSolicitante!: string
  public fkUsuarioExecutor!: string
  public tempoEstimado!: string
  public arquivado!: boolean
  public ordem!: number
  public createdAt!: Date
  public updatedAt!: Date
  public Classificacao!: Classificacao
  public Area!: Area
  public Usuario!: Usuario
  public Status!: Status
}

Atividade.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  protocolo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fkClassificacao: {
    type: DataTypes.UUID,
    allowNull: true
  },
  fkArea: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fkStatus: {
    type: DataTypes.UUID,
    allowNull: false
  },
  pessoal: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  fkUsuarioSolicitante: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fkUsuarioExecutor: {
    type: DataTypes.UUID,
    allowNull: true
  },
  tempoEstimado: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  arquivado: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  ordem : {
    type: DataTypes.INTEGER,
    allowNull : true
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
  tableName: 'atividade',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

Atividade.belongsTo(Classificacao, { foreignKey: 'fkClassificacao' })
Atividade.belongsTo(Area, { foreignKey: 'fkArea' })
Atividade.belongsTo(Usuario, { foreignKey: 'fkUsuarioSolicitante' })
Atividade.belongsTo(Usuario, { foreignKey: 'fkUsuarioExecutor', as: 'UsuarioExecutor' })
Atividade.belongsTo(Status, { foreignKey: 'fkStatus' })

export default Atividade