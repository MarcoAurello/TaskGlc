import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'

class UsuarioController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    res.status(200).json({ message: 'Method not implemented.' })
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
