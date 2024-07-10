"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _unidadecontroller = require('../controller/unidade.controller'); var _unidadecontroller2 = _interopRequireDefault(_unidadecontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);
var _perfilutils = require('../utils/perfil.utils'); var _perfilutils2 = _interopRequireDefault(_perfilutils);

class UnidadeRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _unidadecontroller2.default.search)
    this.router.get('/', _unidadecontroller2.default.all)
    this.router.get('/recebem/', _unidadecontroller2.default.recebem)
    this.router.post('/',  _unidadecontroller2.default.create)
    this.router.get('/:id', _unidadecontroller2.default.find)
    this.router.post('/:id/edit', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _unidadecontroller2.default.update)
    this.router.post('/:id/delete', _routermiddleware2.default.role([_perfilutils2.default.Administrador]), _unidadecontroller2.default.delete)
  }
}

exports. default = new UnidadeRouter().router
