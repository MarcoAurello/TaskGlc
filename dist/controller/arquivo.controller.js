"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* eslint-disable indent */
var _passwordhash = require('password-hash'); var _passwordhash2 = _interopRequireDefault(_passwordhash);


var _arquivomodel = require('../model/arquivo.model'); var _arquivomodel2 = _interopRequireDefault(_arquivomodel);

var _path = require('path');

const path = require('path')
const { promisify } = require('util')
const fs = require('fs')

class ArquivoController  {
  async all (req, res, next) {
    try {
      const { fkAtividade } = req.query

      const registros = await _arquivomodel2.default.findAll({
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

  async create (req, res, next) {
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
        default: {
          return res.status(401).json({
            message: 'arquivo não suportado'
          })
        }
      }

      const nomeArquivo = `${_passwordhash2.default.generate(
        `${arquivo.name}${new Date().toLocaleString()}`
      )}${extension}`

      arquivo.mv(
        `${path.join(__dirname, diretorioArquivos)}${nomeArquivo}`,
        async (err) => {
          if (err) {
            res.status(401).json({ message: err })
          }

          const registro = await _arquivomodel2.default.create({
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

  async find (req, res, next) {
    try {
      const { id } = req.params

      const registro = await _arquivomodel2.default.findOne({
        where: {
          id
        }
      })

      return res.status(200).sendFile(_path.join.call(void 0, __dirname, _optionalChain([registro, 'optionalAccess', _ => _.caminho])))
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

  async update (req, res, next) {
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

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }
}

exports. default = new ArquivoController()
