"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* eslint-disable n/handle-callback-err */

var _activedirectory = require('activedirectory'); var _activedirectory2 = _interopRequireDefault(_activedirectory);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _configuracaoGeralmodel = require('../model/configuracaoGeral.model'); var _configuracaoGeralmodel2 = _interopRequireDefault(_configuracaoGeralmodel);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class AuthenticationController {
  async login (req, res, next) {
    try {
      const { email, password } = req.body

      const configuracao = await _configuracaoGeralmodel2.default.findOne()

      const config = {
        url: _optionalChain([configuracao, 'optionalAccess', _ => _.urlAd]),
        baseDN: _optionalChain([configuracao, 'optionalAccess', _2 => _2.baseDN]),
        username: _optionalChain([configuracao, 'optionalAccess', _3 => _3.usernameAd]),
        password: _optionalChain([configuracao, 'optionalAccess', _4 => _4.passwordAd])
      }

      const ad = new (0, _activedirectory2.default)(config)

      if (!email) {
        return res.status(401).json({ message: 'O campo e-mail deve ser preenchido corretamente.' })
      }

      if (!password) {
        return res.status(401).json({ message: 'O campo senha deve ser preenchido corretamente.' })
      }

      if (_optionalChain([configuracao, 'optionalAccess', _5 => _5.autenticacaoAd])) {
        ad.authenticate(`${email}`, password, async (err, auth) => {
          if (err) {
            return res.status(401).json({ message: 'Login ou senha inválidos.' })
          }

          if (auth) {
            let usuario = await _usuariomodel2.default.findOne({ where: { email } })
            if (!usuario) {
              await _usuariomodel2.default.create({
                email,
                password
              })
            }

            usuario = await _usuariomodel2.default.findOne({ where: { email } })
            return res.status(200).json({ message: 'Usuário validado com sucesso.', token: _optionalChain([usuario, 'optionalAccess', _6 => _6.generateToken, 'call', _7 => _7()]) })
          }
        })
      } else {
        const registro = await _usuariomodel2.default.findOne({ where: { email, ativo: true } })

        if (!registro) {
          return res.status(401).json({ message: 'Não foi possível localizar o usuário.' })
        }

        if (!await _bcrypt2.default.compare(password, registro.passwordHash)) {
          return res.status(401).json({ message: 'Senha inválida.' })
        }

        return res.status(200).json({ message: 'Usuário validado com sucesso.', token: registro.generateToken() })
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

  async logged (req, res, next) {
    try {
      res.status(200).json({ data: req.usuario })
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

exports. default = new AuthenticationController()
