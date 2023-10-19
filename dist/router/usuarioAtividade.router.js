"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _usuarioAtividadecontroller = require('../controller/usuarioAtividade.controller'); var _usuarioAtividadecontroller2 = _interopRequireDefault(_usuarioAtividadecontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);
// import PerfilUtils from '../utils/perfil.utils'

class UsuarioAtividadeRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _usuarioAtividadecontroller2.default.search)
    this.router.get('/', _usuarioAtividadecontroller2.default.all)
    this.router.post('/', _usuarioAtividadecontroller2.default.create)
    this.router.get('/:id', _usuarioAtividadecontroller2.default.find)
    this.router.post('/:id/edit', _usuarioAtividadecontroller2.default.update)
    this.router.post('/:id/delete', _usuarioAtividadecontroller2.default.delete)
  }
}

exports. default = new UsuarioAtividadeRouter().router
