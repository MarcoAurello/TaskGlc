import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Atividade from '../model/atividade.model'
import Mensagem from '../model/mensagem.model'
import Status from '../model/status.model'
import protocolo from '../utils/protocolo.utils'
import Area from '../model/area.model'
import Classificacao from '../model/classificacao.model'
import Usuario from '../model/usuario.model'
import Unidade from '../model/unidade.model'

class AtividadeController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        fkUnidade,
        fkArea,
        titulo,
        conteudo
      } = req.body

      if (!fkUnidade) {
        return res.status(401).json({ message: 'O campo unidade deve ser preenchido corretamente.' })
      }

      if (!fkArea) {
        return res.status(401).json({ message: 'O campo área deve ser preenchido corretamente.' })
      }

      if (!titulo) {
        return res.status(401).json({ message: 'O campo título deve ser preenchido corretamente.' })
      }

      if (!conteudo) {
        return res.status(401).json({ message: 'O campo conteudo deve ser preenchido corretamente.' })
      }

      const classificacao = await Classificacao.findOne({ where: { nome: 'Não Definido' } })
      const status = await Status.findOne({ where: { nome: 'Aberto' } })

      const atividade = await Atividade.create({
        titulo,
        fkClassificacao: classificacao?.id,
        protocolo: protocolo(),
        fkArea,
        fkStatus: status?.id,
        fkUsuarioSolicitante: req.usuario.id
      })

      await Mensagem.create({
        conteudo,
        fkAtividade: atividade.id,
        fkUsuario: req.usuario.id
      })

      res.status(200).json({ data: atividade, message: 'Cadastro realizado com sucesso.' })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await Atividade.findOne({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          Usuario
        ],
        where: { id }
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

export default new AtividadeController()
