import { Model, DataTypes } from 'sequelize'
import connection from './connection'

import { uuid } from 'uuidv4'
import Usuario from './usuario.model'

class Questionario extends Model {
  public id!: string
  public pergunta1!: number
  public pergunta2!: number
  public pergunta3!: number
  public pergunta4!: number
  public pergunta5!: number
  public pergunta6!: number
  public pergunta7!: string
  public pergunta8!: string
  public score!: number
  
 
  public fkUsuario!: string
  public Usuario!: Usuario

  public createdAt!: Date
  public updatedAt!: Date


}

Questionario.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  pergunta1: {
    type: DataTypes.NUMBER,
    allowNull: false,

  },

  pergunta2: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
  pergunta3: {
    type: DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta4: {
    type: DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta5: {
    type: DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta6: {
    type: DataTypes.NUMBER,
    allowNull: false,

  },
  pergunta7: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
  pergunta8: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
  score: {
    type: DataTypes.NUMBER,
    allowNull: false,

  },

  

  fkUsuario: {
    type: DataTypes.UUID,
    allowNull: false,

  }
}, {
  sequelize: connection,
  tableName: 'questionario',
  hooks: {
    async beforeValidate (instance) {
      instance.id = uuid()
    }
  }
})

Questionario.belongsTo(Usuario, { foreignKey: 'fkUsuario' })

export default Questionario
