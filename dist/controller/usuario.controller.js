"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _areamodel = require('../model/area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);
var _perfilmodel = require('../model/perfil.model'); var _perfilmodel2 = _interopRequireDefault(_perfilmodel);
var _unidademodel = require('../model/unidade.model'); var _unidademodel2 = _interopRequireDefault(_unidademodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);


class UsuarioController  {
  async all (req, res, next) {
    try {
      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await _usuariomodel2.default.count()) / tamanho)

      const usuarios = await _usuariomodel2.default.findAll({
        limit,
        offset,
        include: [_perfilmodel2.default]
      })

      res.status(200).json({
        data: usuarios,
        paginacao: {
          pagina,
          tamanho,
          numeroDePaginas
        }
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

  async create (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async find (req, res, next) {
    try {
      const { id } = req.params

      const registro = await _usuariomodel2.default.findOne({
        where: {
          id
        },
        include: [
          {
            model: _areamodel2.default,
            as: 'Area',
            include: [_unidademodel2.default]
          },
          _perfilmodel2.default
        ]
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
    try {
      const { id } = req.params
      // console.log(id)
      const {
        nome,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,
        fkArea,
        ativo,
        primeiroLogin
      } = req.body

      console.log(req.body)

      await _usuariomodel2.default.update(
        {
          nome,
          telefone,
          chapa,
          demandante,
          fkPerfil,
          fkUnidade,
          fkArea,
          ativo,
          primeiroLogin
        },
        {
          where: {
            id
          },
          individualHooks: false
        }
      )

      const registro = await _usuariomodel2.default.findOne({ where: { id } })

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

  async validar (req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
      const {
        nome,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,
        fkArea,
        ativo,
        primeiroLogin
      } = req.body

      await _usuariomodel2.default.update(
        {
          nome,
          telefone,
          chapa,
          demandante,
          fkPerfil,
          fkUnidade,
          fkArea,
          ativo,
          primeiroLogin,
          validado: true,
          fkValidador: req.usuario.id
        },
        {
          where: {
            id
          },
          individualHooks: false
        }
      )

      const registro = await _usuariomodel2.default.findOne({ where: { id } })

      res
        .status(200)
        .json({ data: registro, message: 'Usuário validado com sucesso.' })
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

  async updatePrimeiroAcesso (
    req,
    res,
    next
  ) {
    try {
      const { nome, telefone, chapa, fkPerfil, fkUnidade, fkArea } = req.body

      if (!nome) {
        return res
          .status(401)
          .json({ message: 'O campo nome deve ser preenchido corretamente.' })
      }

      if (!chapa) {
        return res
          .status(401)
          .json({ message: 'O campo chapa deve ser preenchido corretamente.' })
      }

      if (!telefone) {
        return res.status(401).json({
          message: 'O campo telefone deve ser preenchido corretamente.'
        })
      }

      if (!fkPerfil) {
        return res.status(401).json({
          message: 'O campo perfil deve ser preenchido corretamente.'
        })
      }

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }

      if (!fkArea) {
        return res
          .status(401)
          .json({ message: 'O campo área deve ser preenchido corretamente.' })
      }

      await _usuariomodel2.default.update(
        {
          nome,
          telefone,
          chapa,
          fkPerfil,
          fkUnidade,
          fkArea,
          primeiroLogin: false
        },
        {
          where: {
            id: req.usuario.id
          },
          individualHooks: false
        }
      )

      const registro = await _usuariomodel2.default.findOne({ where: { id: req.usuario.id } })

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

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async equipe (req, res, next) {
    try {
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await _usuariomodel2.default.count()) / tamanho)

      const registros = await _usuariomodel2.default.findAll({
        limit,
        offset,
        include: [_perfilmodel2.default, { model: _areamodel2.default, include: [_unidademodel2.default] }],
        where: {
          '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _ => _.fkUnidade]),
          validado: true
        }
      })

      res.status(200).json({
        data: registros,
        paginacao: {
          pagina,
          tamanho,
          numeroDePaginas
        }
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

  async naoValidado (req, res, next) {
    try {
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil(
        (await _usuariomodel2.default.count({
          include: [
            _perfilmodel2.default,
            {
              model: _areamodel2.default,
              include: [{ model: _unidademodel2.default, where: { id: _optionalChain([area, 'optionalAccess', _2 => _2.fkUnidade]) } }]
            }
          ]
        })) / tamanho
      )

      const registros = await _usuariomodel2.default.findAll({
        limit,
        offset,
        include: [_perfilmodel2.default, { model: _areamodel2.default, include: [_unidademodel2.default] }],
        where: {
          '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _3 => _3.fkUnidade]),
          validado: false
        }
      })

      res.status(200).json({
        data: registros,
        paginacao: {
          pagina,
          tamanho,
          numeroDePaginas
        }
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
}
exports. default = new UsuarioController()
