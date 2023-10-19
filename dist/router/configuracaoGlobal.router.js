"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _configuracaoGlobalcontroller = require('../controller/configuracaoGlobal.controller'); var _configuracaoGlobalcontroller2 = _interopRequireDefault(_configuracaoGlobalcontroller);
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
    this.router.get('/search/', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.search)
    this.router.get('/', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.all)
    this.router.post('/', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.create)
    this.router.get('/:id', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.find)
    this.router.post('/:id/edit', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.update)
    this.router.post('/:id/delete', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.delete)
    this.router.post('/enviaremaildeteste/', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _configuracaoGlobalcontroller2.default.enviarEmailDeTeste)
  }
}

exports. default = new UsuarioRouter().router
