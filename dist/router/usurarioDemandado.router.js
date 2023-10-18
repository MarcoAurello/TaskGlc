"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _usuarioDemandadocontroller = require('../controller/usuarioDemandado.controller'); var _usuarioDemandadocontroller2 = _interopRequireDefault(_usuarioDemandadocontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);

class UsuarioDemandadoRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _usuarioDemandadocontroller2.default.search)
    this.router.get('/', _usuarioDemandadocontroller2.default.all)
    this.router.post('/', _usuarioDemandadocontroller2.default.create)
    this.router.get('/:id', _usuarioDemandadocontroller2.default.find)
    this.router.post('/:id/edit', _usuarioDemandadocontroller2.default.update)
    this.router.post('/:id/delete', _usuarioDemandadocontroller2.default.delete)
  }
}

exports. default = new UsuarioDemandadoRouter().router
