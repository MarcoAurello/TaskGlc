"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _classificacaocontroller = require('../controller/classificacao.controller'); var _classificacaocontroller2 = _interopRequireDefault(_classificacaocontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);
// import PerfilUtils from '../utils/perfil.utils'

class ClassificacaoRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _classificacaocontroller2.default.search)
    this.router.get('/', _classificacaocontroller2.default.all)
    this.router.post('/', _classificacaocontroller2.default.create)
    this.router.get('/:id', _classificacaocontroller2.default.find)
    this.router.post('/:id/edit', _classificacaocontroller2.default.update)
    this.router.post('/:id/delete', _classificacaocontroller2.default.delete)
  }
}

exports. default = new ClassificacaoRouter().router
