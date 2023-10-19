"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _areamodel = require('../model/area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);
var _unidademodel = require('../model/unidade.model'); var _unidademodel2 = _interopRequireDefault(_unidademodel);

var _perfilmodel = require('../model/perfil.model'); var _perfilmodel2 = _interopRequireDefault(_perfilmodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);

const { promisify } = require('util')

class RouterMiddleware {
  async authenticated (req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ message: 'Token not provided.' })
    }

    const [, token] = authorization.split(' ')

    try {
      const decoded = await promisify(_jsonwebtoken2.default.verify)(token, 'c43e4311194ab5795eaf4db533b8172d')

      const registro = await _usuariomodel2.default.findOne({
        where: { id: decoded.id },
        include: [_perfilmodel2.default, { model: _areamodel2.default, include: [_unidademodel2.default] }]
      })

      if (!registro) {
        return res.status(401).json({ message: 'Você não tem permissão de acessar este recurso.' })
      }

      req.usuario = registro

      return next()
    } catch (err) {
      return res.status(401).json({ message: 'Token not provided.' })
    }
  }

   role (perfis) {
    return [
      async (req, res, next) => {
        try {
          if (!req.usuario.validado) {
            return res.status(401).json({ message: 'Você não possui permissão para acessar este recurso.' })
          }

          if (req.usuario.Perfil) {
            if (!perfis.includes(req.usuario.Perfil.nome)) {
              return res.status(401).json({ message: 'Você não possui permissão para acessar este recurso.' })
            }
          } else {
            return res.status(401).json({ message: 'Você não possui permissão para acessar este recurso.' })
          }
        } catch (err) {
          return res.status(401).json({ message: 'Você não possui permissão para acessar este recurso.' })
        }

        return next()
      }
    ]
  }
}

exports. default = new RouterMiddleware()
