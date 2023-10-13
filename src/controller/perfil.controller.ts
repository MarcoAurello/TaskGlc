import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Perfil from '../model/perfil.model'

class PerfilController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Perfil.findAll({ order: [['nome', 'asc']] })

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err);
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message });
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message });
      }

      res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' });
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

export default new PerfilController()
