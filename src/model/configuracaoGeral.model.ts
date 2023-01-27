import { Model, DataTypes } from 'sequelize'
import connection from './connection'

class ConfiguracaoGeral extends Model {
  public id!: string
  public autenticacaoAd!: boolean
  public createdAt!: Date
  public updatedAt!: Date
}

ConfiguracaoGeral.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  autenticacaoAd: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize: connection,
  tableName: 'configuracaoGeral'
})

export default ConfiguracaoGeral
