import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import TimeLineStatus from '../model/timeLineStatus.model'
import timeLineStatusRouter from '../router/timeLineStatus.router'
import Usuario from '../model/usuario.model'
import Status from '../model/status.model'
import Atividade from '../model/atividade.model'

class TimeLineStatusController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
}
  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await TimeLineStatus.findAll({
        where: { fkAtividade: id },
        include: [Usuario, Status, Atividade],
        order: [['createdAt', 'DESC']] 
    });
      console.log('gggggg' + JSON.stringify(registro))

      res.status(200).json({ data: registro })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
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

export default new TimeLineStatusController()
