import { Request, Response, NextFunction } from 'express'
import Perfil from '../model/perfil.model'
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
    throw new Error('Method not implemented.')
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
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
