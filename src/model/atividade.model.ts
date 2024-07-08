import { DataTypes, Model } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'
import Classificacao from './classificacao.model'
import Area from './area.model'
import Usuario from './usuario.model'
import Status from './status.model'


class Atividade extends Model {
  public id!: string
  public titulo!: Text
  public protocolo!: string
  public cor!: Text

  public cnpj!: Text
  public razao!: Text
  public email!: Text
  public fone!: Text
  public gPagamento!: Text
  public filial!: Text
  public gCotacao!: Text

  public centroCusto!: string
  public indicacao: Text
  public informacoes: Text 
  public forma!: Text
  public material: Text
  public medida: Text
  public eletro: Text;
  public categoria !: Text
  public detalhes !: Text
  public caminho !: string
  public fkClassificacao!: string
  public fkArea!: string
  public fkStatus!: string
  public pessoal!: Boolean
  public dimensao!: Text;
  public fkUsuarioSolicitante!: string
  public fkUsuarioExecutor!: string
  public tempoEstimado!: string
  public arquivado!: boolean
  public editar!: boolean
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
    type: DataTypes.TEXT,
    allowNull: false
  },
  forma: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cor: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  cnpj: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  razao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fone: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gPagamento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  filial: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gCotacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },






  indicacao : {
    type: DataTypes.TEXT,
    allowNull: true
  },
  centroCusto : {
    type: DataTypes.STRING,
    allowNull: true
  },

  informacoes : {
    type: DataTypes.TEXT,
    allowNull: true
  },


  medida: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  eletro: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  material: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  protocolo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  detalhes: {
    type: DataTypes.TEXT,
    allowNull: true
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

  editar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },


  dimensao: {
    type: DataTypes.TEXT,
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