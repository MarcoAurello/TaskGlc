"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _areamodel = require('../model/area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);
var _unidademodel = require('../model/unidade.model'); var _unidademodel2 = _interopRequireDefault(_unidademodel);

class AreaController  {
  async all (req, res, next) {
    try {
      const { fkUnidade } = req.query
      console.log('qqqqqq')

      if (fkUnidade) {
        const registros = await _areamodel2.default.findAll({
          where: { fkUnidade },
          include: [_unidademodel2.default],
          order: [['nome', 'asc']]
        })

        return res.status(200).json({ data: registros })
      } else {
        const registros = await _areamodel2.default.findAll({
          include: [_unidademodel2.default],
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
    req,
    res,
    next
  ) {
    try {
      const { fkArea } = req.params
      console.log(fkArea)
      const registros = await _areamodel2.default.findOne({
        where: {
          id: fkArea
        },
        include: [_unidademodel2.default]
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

  async create (req, res, next) {
    try {
      const { nome, descricao, fkUnidade } = req.body
      console.log('sssssssss')

      const registro = await _areamodel2.default.create({ nome, descricao, fkUnidade })

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

  async find (req, res, next) {
    try {
      const { id } = req.params

      const registro = await _areamodel2.default.findOne({ where: { id } })

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
      const { nome, descricao, fkUnidade } = req.body

      console.log(fkUnidade)
      console.log('xxxxxx')
      const registro = await _areamodel2.default.findOne({ where: { id } })

      let params = {}
      params = _optionalChain([registro, 'optionalAccess', _ => _.nome]) !== nome ? { ...params, nome } : params
      params =
        _optionalChain([registro, 'optionalAccess', _2 => _2.descricao]) !== descricao ? { ...params, descricao } : params
      params =
        _optionalChain([registro, 'optionalAccess', _3 => _3.fkUnidade]) !== fkUnidade ? { ...params, fkUnidade } : params

      await _areamodel2.default.update(params, {
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

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }
}

exports. default = new AreaController()
