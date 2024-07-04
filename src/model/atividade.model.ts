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
  public cor!: string
  public indicacao: string
  public informacoes: string 
  public forma!: string
  public material: string
  public medida: string
  public eletro: string;
  public categoria !: string
  public caminho !: string
  public fkClassificacao!: string
  public fkArea!: string
  public fkStatus!: string
  public pessoal!: Boolean
  public dimensao!: string;
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
  forma: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: true
  },

  indicacao : {
    type: DataTypes.STRING,
    allowNull: true
  },

  informacoes : {
    type: DataTypes.STRING,
    allowNull: true
  },


  medida: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  eletro: {
    type: DataTypes.STRING,
    allowNull: true
  },

  material: {
    type: DataTypes.STRING,
    allowNull: true
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

  dimensao: {
    type: DataTypes.STRING,
    allowNull: true
  },

  fkUsuarioSolicitante: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fkUsuarioExecutor: {
    type: DataTypes.UUID,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  caminho: {
    type: DataTypes.STRING,
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
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: true
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

Atividade.belongsTo(Usuario, { foreignKey: 'fkUsuarioSolicitante' })
Atividade.belongsTo(Usuario, { foreignKey: 'fkUsuarioExecutor', as: 'UsuarioExecutor' })
Atividade.belongsTo(Status, { foreignKey: 'fkStatus' })
Atividade.belongsTo(Area, { foreignKey: 'fkArea' })

export default Atividade