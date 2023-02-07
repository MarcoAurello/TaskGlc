import { Request, Response, NextFunction } from 'express'
import Area from '../model/area.model'
import Perfil from '../model/perfil.model'
import Unidade from '../model/unidade.model'
import Usuario from '../model/usuario.model'
import { IController } from './controller.inteface'

class UsuarioController implements IController {
  async all (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await Usuario.count()) / tamanho)

      const usuarios = await Usuario.findAll({
        limit,
        offset,
        include: [Perfil]
      })

      res.status(200).json({
        data: usuarios,
        paginacao: {
          pagina,
          tamanho,
          numeroDePaginas
        }
      })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        nome,
        email,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,
        fkArea
      } = req.body

      console.log(req.body)

      const registro = await Usuario.create({
        nome,
        email,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,
        fkArea,
        password: '987654321'
      })

      res.status(200).json({ data: registro, message: 'Usuário cadastro com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await Usuario.findOne({
        where: {
          id
        },
        include: [{
          model: Area, as: 'Area', include: [Unidade]
        },
        Perfil]
      })

      res.status(200).json({ data: registro })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export default new UsuarioController()
