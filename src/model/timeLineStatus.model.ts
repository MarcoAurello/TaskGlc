import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'
import Unidade from './unidade.model'
import Atividade from './atividade.model'
import Usuario from './usuario.model'
import Status from './status.model'

class TimeLineStatus extends Model {
  public id!: string

 
 
  public fkStatus!: string
  public fkUsuario!: string
  public fkAtividade!: string
 
 
  public createdAt!: Date
  public updatedAt!: Date
  public Atividade!: Atividade
  public Usuario!: Usuario
  public Status!: Status
}

TimeLineStatus.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },

  fkStatus: {
    type: DataTypes.UUID,
    allowNull: false,
   
  },
  fkUsuario: {
    type: DataTypes.UUID,
    allowNull: false,
   
  },
  fkAtividade: {
    type: DataTypes.UUID,
    allowNull: false,
   
  },


}, {
  sequelize: connection,
  tableName: 'timeLineStatus',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})





TimeLineStatus.belongsTo(Atividade, { foreignKey: 'fkAtividade' })

TimeLineStatus.belongsTo(Usuario, { foreignKey: 'fkUsuario' })
TimeLineStatus.belongsTo(Status, { foreignKey: 'fkStatus' })

export default TimeLineStatus
