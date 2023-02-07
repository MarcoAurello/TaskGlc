import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Area from '../model/area.model'

class AreaController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkUnidade } = req.query

      if (fkUnidade) {
        const registros = await Area.findAll({ where: { fkUnidade }, order: [['nome', 'asc']] })

        return res.status(200).json({ data: registros })
      }

      return res.status(200).json({ data: [] })
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

export default new AreaController()
