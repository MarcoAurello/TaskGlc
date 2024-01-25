/* eslint-disable indent */
import hash from 'password-hash'
import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Arquivo from '../model/arquivo.model'
import Atividade from '../model/atividade.model'
import { join } from 'path'

const path = require('path')
const { promisify } = require('util')
const fs = require('fs')

class ArquivoController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkAtividade } = req.query

      const registros = await Arquivo.findAll({
        where: { fkAtividade }
      })

      res.status(200).json({ data: registros })
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

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(401)
          .json({ message: 'Não há arquivo para guardar!' })
      }

      const { arquivo } = req.files
      const diretorioArquivos = './uploads/'

      console.log(arquivo)

      let extension = '.pdf'

      switch (arquivo.mimetype) {
        case 'image/jpeg': {
          extension = '.jpeg'
          break
        }
        case 'image/png': {
          extension = '.png'
          break
        }
        case 'application/pdf': {
          extension = '.pdf'
          break
        }
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
          extension = '.docx'
          break
        }
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
          extension = '.xlsx'
          break
        }
        case 'video/mp4': {
          extension = '.mp4';
          break;
        }
        default: {
          return res.status(401).json({
            message: 'arquivo não suportado'
          })
        }
      }

      const nomeArquivo = `${hash.generate(
        `${arquivo.name}${new Date().toLocaleString()}`
      )}${extension}`

      arquivo.mv(
        `${path.join(__dirname, diretorioArquivos)}${nomeArquivo}`,
        async (err) => {
          if (err) {
            res.status(401).json({ message: err })
          }

          const registro = await Arquivo.create({
            nome: nomeArquivo,
            nomeApresentacao: arquivo.name,
            caminho: diretorioArquivos + nomeArquivo
          })

          return res
            .status(200)
            .json({ data: registro, message: 'Upload realizado com sucesso.' })
        }
      )
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

      const registro = await Arquivo.findOne({
        where: {
          id
        }
      })

      return res.status(200).sendFile(join(__dirname, registro?.caminho))
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
    // try{
    //   const {fkAtividade} = req.params
    //   await Atividade.update(
    //     {
    //       fkAtividade
    //     },
    //     {
    //       where:{
    //         id: '0c44ead6-4c86-49e3-b687-1d56fcb6ae7a'
    //       }
    //     }
    //   )
    //   res
    //     .status(200)
    //     .json({ data: registro, message: "Alteração realizada com sucesso." });
    // } catch (err) {
    //   console.log(err);
    //   if (typeof err.errors[0].message === "undefined") {
    //   res.status(401).json({ message: JSON.stringify(err) });
    // } else {
    //   res.status(401).json({ message: err.errors[0].message });
    // }
    // }
    throw new Error('Method not implemented.')
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export default new ArquivoController()
