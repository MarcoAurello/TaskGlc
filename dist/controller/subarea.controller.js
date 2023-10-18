"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _subareamodel = require('../model/subarea.model'); var _subareamodel2 = _interopRequireDefault(_subareamodel);

class SubAreaController  {
  async all (req, res, next) {
    try {
      const { fkArea } = req.query

      if (fkArea) {
        const registros = await _subareamodel2.default.findAll({
          where: { fkArea }

        })

        return res.status(200).json({ data: registros })
      } else {
        const registros = await _subareamodel2.default.findAll()

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

  async create (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async find (req, res, next) {
    throw new Error('Method not implemented.')
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

exports. default = new SubAreaController()
