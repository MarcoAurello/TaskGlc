import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'

class Arquivo extends Model {
  public id!: string
  public nome!: string
  public nomeApresentacao!: string
  public caminho!: string
  public fkAtividade!: string
  public hash!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Arquivo.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomeApresentacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caminho: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fkAtividade: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize: connection,
  tableName: 'arquivo',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

export default Arquivo
