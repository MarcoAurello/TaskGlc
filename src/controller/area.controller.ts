import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Area from '../model/area.model'
import Unidade from '../model/unidade.model'

class AreaController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkUnidade } = req.query
      console.log('qqqqqq')

      if (fkUnidade) {
        const registros = await Area.findAll({
          where: { fkUnidade },
          include: [Unidade],
          order: [['nome', 'asc']]
        })

        return res.status(200).json({ data: registros })
      } else {
        const registros = await Area.findAll({
          include: [Unidade],
          order: [['nome', 'asc']]
        })

        return res.status(200).json({ data: registros })
      }
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

  async areaSolicitacao (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { fkArea } = req.params
      console.log(fkArea)
      const registros = await Area.findOne({
        where: {
          id: fkArea
        },
        include: [Unidade]
      })

      return res.status(200).json({ data: registros })
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

  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { nome, descricao, fkUnidade } = req.body
      console.log('sssssssss')

      const registro = await Area.create({ nome, descricao, fkUnidade })

      res
        .status(200)
        .json({ data: registro, message: 'Cadastro realizado com sucesso.' })
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

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await Area.findOne({ where: { id } })

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
    try {
      const { id } = req.params
      const { nome, descricao, fkUnidade } = req.body

      console.log(fkUnidade)
      console.log('xxxxxx')
      const registro = await Area.findOne({ where: { id } })

      let params = {}
      params = registro?.nome !== nome ? { ...params, nome } : params
      params =
        registro?.descricao !== descricao ? { ...params, descricao } : params
      params =
        registro?.fkUnidade !== fkUnidade ? { ...params, fkUnidade } : params

      await Area.update(params, {
        where: {
          id
        },
        individualHooks: true
      })

      // registro = await Area.findOne({ where: { id } });

      res
        .status(200)
        .json({ data: registro, message: 'Alteração realizada com sucesso.' })
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

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export default new AreaController()
