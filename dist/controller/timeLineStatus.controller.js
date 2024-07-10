"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _timeLineStatusmodel = require('../model/timeLineStatus.model'); var _timeLineStatusmodel2 = _interopRequireDefault(_timeLineStatusmodel);

var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _statusmodel = require('../model/status.model'); var _statusmodel2 = _interopRequireDefault(_statusmodel);
var _atividademodel = require('../model/atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);

class TimeLineStatusController  {
  async all (req, res, next) {
    throw new Error('Method not implemented.')
}
  async create (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async find (req, res, next) {
    try {
      const { id } = req.params

      const registro = await _timeLineStatusmodel2.default.findAll({
        where: { fkAtividade: id },
        include: [_usuariomodel2.default, _statusmodel2.default, _atividademodel2.default],
        order: [['createdAt', 'DESC']] 
    });
      console.log('gggggg' + JSON.stringify(registro))

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

exports. default = new TimeLineStatusController()
