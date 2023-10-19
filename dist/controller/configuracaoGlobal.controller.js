"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _configuracaoGeralmodel = require('../model/configuracaoGeral.model'); var _configuracaoGeralmodel2 = _interopRequireDefault(_configuracaoGeralmodel);
var _emailutils = require('../utils/email.utils'); var _emailutils2 = _interopRequireDefault(_emailutils);


class ConfiguracaoGlobalController  {
  async all (req, res, next) {
    try {
      const registro = await _configuracaoGeralmodel2.default.findOne()

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

  async create (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async find (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const {
        email,
        password,
        host,
        porta,
        autenticacaoAd,
        ssl,
        template,
        urlAd,
        baseDN,
        usernameAd,
        passwordAd
      } = req.body

      await _configuracaoGeralmodel2.default.update({
        email,
        password,
        host,
        porta,
        autenticacaoAd,
        ssl,
        template,
        urlAd,
        baseDN,
        usernameAd,
        passwordAd
      }, {
        where: {
          id
        },
        individualHooks: true
      })

      const registro = await _configuracaoGeralmodel2.default.findOne()

      res.status(200).json({ data: registro, message: 'Alteração realizada com sucesso.' })
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

  async enviarEmailDeTeste (req, res, next) {
    try {
      const {
        to,
        message
      } = req.body

      await _emailutils2.default.enviar(to, message)
        .then(() => {
          return res.status(200).json({ message: 'Email enviado com sucesso.' })
        })
        .catch(err => {
          return res.status(401).json({ message: JSON.stringify(err) })
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

exports. default = new ConfiguracaoGlobalController()
