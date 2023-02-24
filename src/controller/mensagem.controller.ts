import { Request, Response, NextFunction } from 'express'
import Atividade from '../model/atividade.model'
import Mensagem from '../model/mensagem.model'
import Usuario from '../model/usuario.model'
import { IController } from './controller.inteface'

class MensagemController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkAtividade } = req.query

      const registros = await Mensagem.findAll({
        where: { fkAtividade },
        include: [Usuario],
        order: [['createdAt', 'desc']]
      })

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkAtividade, conteudo } = req.body

      await Mensagem.create({
        fkAtividade,
        conteudo,
        fkUsuario: req.usuario.id
      })

      const atividade = await Atividade.findOne({ where: { id: fkAtividade } })

      res.status(200).json({ data: atividade, message: 'Cadastro realizado com sucesso.' })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async mensagemPrimeira (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkAtividade } = req.query

      const registros = await Mensagem.findAll({
        where: {fkAtividade : fkAtividade }

      })

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }


  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
     try {
      const { fkAtividade } = req.query
      
      const registros = await Mensagem.findAll({
        where: {fkAtividade : fkAtividade }

      })

      res.status(200).json({ data: registros })
    } catch (err) {
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

export default new MensagemController()
