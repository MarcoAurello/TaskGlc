import { DataTypes, Model } from 'sequelize';
import { uuid } from 'uuidv4';
import connection from './connection';
import Classificacao from './classificacao.model';
import Area from './area.model';
import Usuario from './usuario.model';
import Status from './status.model';
import Contrato from './contrato.model';

class Atividade extends Model {
  public id!: string;
  public titulo!: string;
  public protocolo!: string;
  public cor!: string;

  public cnpj!: string;
  public razao!: string;
  public email!: string;
  public fone!: string;
  public gPagamento!: string;
  public filial!: string;
  public gCotacao!: string;
  public valorNota!: number
  public atesto!: string;

  public centroCusto!: string;
  public codigoMira!: string;
  public indicacao!: string;
  public informacoes!: string;
  public forma!: string;
  public material!: string;
  public medida!: string;
  public eletro!: string;
  public categoria!: string;
  public detalhes!: string;
  public caminho!: string;
  public fkClassificacao!: string;
  public fkArea!: string;
  public fkStatus!: string;
  public pessoal!: boolean;
  public dimensao!: string;
  public fkUsuarioSolicitante!: string;
  public fkUsuarioExecutor!: string;
  public fkContrato!: string;
  public numeroSerie!: string;
  public numeroPedido!: string;
  public tempoEstimado!: number;
  public arquivado!: boolean;
  public editar!: boolean;
  public ordem!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Novos campos
  public nomeProjeto!: string;
  public fornecedor!: string;
  public numeroContrato!: string;
  public numeroNota!: string;
  public rateio!: string;
  public localPatrimonio!: string;
  public qtdPlanilha!: string;
  public prazoInicioAtividades!: Date;
  public anoMr!: string;
  public segmentoMr!: string;
  public parametrizacaoCadastro!: string;

  public Classificacao!: Classificacao;
  public Contrato!: Contrato;
  public Area!: Area;
  public Usuario!: Usuario;
  public Status!: Status;
}

Atividade.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: uuid()
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
  atesto: {
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
  localPatrimonio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  numeroSerie: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  numeroPedido: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gPagamento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  codigoMira: {
    type: DataTypes.TEXT,
    allowNull: true
  },


  valorNota: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {
        msg: 'O campo valorContrato deve ser um número válido.'
      }
    }
  },
  filial: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fornecedor: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  numeroContrato: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  numeroNota: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rateio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gCotacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  indicacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  centroCusto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  informacoes: {
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
    type: DataTypes.STRING,
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
  fkContrato: {
    type: DataTypes.UUID,
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
  },
  // Novos campos
  nomeProjeto: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  qtdPlanilha: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prazoInicioAtividades: {
    type: DataTypes.DATE,
    allowNull: true
  },
  anoMr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  segmentoMr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parametrizacaoCadastro: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize: connection,
  tableName: 'atividade',
  hooks: {
    beforeValidate(instance) {
      if (!instance.id) {
        instance.id = uuid();
      }
    }
  }
});

Atividade.belongsTo(Classificacao, { foreignKey: 'fkClassificacao' });
Atividade.belongsTo(Usuario, { foreignKey: 'fkUsuarioSolicitante'});
Atividade.belongsTo(Usuario, { foreignKey: 'fkUsuarioExecutor', as: 'UsuarioExecutor' });
Atividade.belongsTo(Status, { foreignKey: 'fkStatus' });
Atividade.belongsTo(Area, { foreignKey: 'fkArea' });
Atividade.belongsTo(Contrato, { foreignKey: 'fkContrato' });
Contrato.hasMany(Atividade, { foreignKey: 'fkContrato' });

export default Atividade;
