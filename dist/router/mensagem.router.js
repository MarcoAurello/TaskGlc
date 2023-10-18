"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mensagemcontroller = require('../controller/mensagem.controller'); var _mensagemcontroller2 = _interopRequireDefault(_mensagemcontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);
// import PerfilUtils from '../utils/perfil.utils'

class MensagemRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _mensagemcontroller2.default.search)
    this.router.get('/', _mensagemcontroller2.default.all)
    this.router.get('/mensagemPrimeira/:id', _mensagemcontroller2.default.mensagemPrimeira)
    this.router.post('/', _mensagemcontroller2.default.create)
    this.router.get('/:id', _mensagemcontroller2.default.find)
    this.router.post('/:id/edit', _mensagemcontroller2.default.update)
    this.router.post('/:id/delete', _mensagemcontroller2.default.delete)
  }
}

exports. default = new MensagemRouter().router
