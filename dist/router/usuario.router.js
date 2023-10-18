"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _usuariocontroller = require('../controller/usuario.controller'); var _usuariocontroller2 = _interopRequireDefault(_usuariocontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);
var _perfilutils = require('../utils/perfil.utils'); var _perfilutils2 = _interopRequireDefault(_perfilutils);

class UsuarioRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/naovalidado/', _usuariocontroller2.default.naoValidado)
    this.router.get('/equipe/', _usuariocontroller2.default.equipe)
    this.router.get('/search/', _usuariocontroller2.default.search)
    this.router.get('/', _usuariocontroller2.default.all)
    this.router.post('/', _usuariocontroller2.default.create)
    this.router.get('/:id',_usuariocontroller2.default.find)
    this.router.post('/:id/edit', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _usuariocontroller2.default.update)
    this.router.post('/:id/validar', _routermiddleware2.default.role([_perfilutils2.default.Administrador, _perfilutils2.default.Gerente, _perfilutils2.default.Coordenador]), _usuariocontroller2.default.validar)
    this.router.post('/edit/primeiroacesso/', _usuariocontroller2.default.updatePrimeiroAcesso)
    this.router.post('/:id/delete', _usuariocontroller2.default.delete)
  }
}

exports. default = new UsuarioRouter().router
