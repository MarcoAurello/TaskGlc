"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _emailmodel = require('../model/email.model'); var _emailmodel2 = _interopRequireDefault(_emailmodel);

class EmailController  {
  async all (req, res, next) {
    try {
      const registros = await _emailmodel2.default.findAll()

      res.status(200).json({ data: registros })
    } catch (err) {
        console.log(err)
      res.status(401).json({ message: err.errors[0].message })
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

exports. default = new EmailController()
