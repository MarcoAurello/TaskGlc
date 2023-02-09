import { Model, DataTypes } from 'sequelize'
import connection from './connection'

class Classificacao extends Model {
  public id!: string
  public nome!: string
  public descricao!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Classificacao.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.STRING,
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
  tableName: 'classificacao'
})

export default Classificacao
