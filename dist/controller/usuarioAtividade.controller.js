"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _usuarioAtividademodel = require('../model/usuarioAtividade.model'); var _usuarioAtividademodel2 = _interopRequireDefault(_usuarioAtividademodel);
var _areamodel = require('../model/area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);
var _atividademodel = require('../model/atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _emailutils = require('../utils/email.utils'); var _emailutils2 = _interopRequireDefault(_emailutils);
// import emailUtils from '../utils/email.utils'
// import Chamado from '../models/chamado-model';

class UsuarioAtividadeController  {
  async all (req, res, next) {
    try {
      const area = await _areamodel2.default.findOne({
        where: { id: req.usuario.fkArea }
      })
      const registros = await _usuariomodel2.default.findAll({
        include: [_areamodel2.default],
        where: {
          '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _ => _.fkUnidade])
          // validado: true,
        }
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
      const { fkClassificacao, fkAtividade, fkUsuario, ativo } = req.body
      const emailExecutor = await _usuariomodel2.default.findOne({ where: { id: fkUsuario } })

      const registro = await _usuarioAtividademodel2.default.create({
        fkUsuario,
        fkAtividade,
        ativo
      })

      await _atividademodel2.default.update(
        {
          fkClassificacao,
          fkUsuarioExecutor: fkUsuario
        },
        {
          where: { id: fkAtividade }
        }
      )

      const msg = `
      <b>Chegou atividade para você.<br>
      <a href="https://www7.pe.senac.br/taskmanager/atividade/${fkAtividade}/edit">CLIQUE PARA VER</a><p>
  `

      _emailutils2.default.enviar(_optionalChain([emailExecutor, 'optionalAccess', _2 => _2.email]), msg)

      res
        .status(200)
        .json({
          data: registro,
          message: 'Chamado enviado para o funcionario '
        })
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

      const registro = await _usuarioAtividademodel2.default.findOne({
        where: {
          id
        }
      })

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

  async update (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }
}

exports. default = new UsuarioAtividadeController()
