"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bibliotecaDeErros = require('../controller/bibliotecaDeErros'); var _bibliotecaDeErros2 = _interopRequireDefault(_bibliotecaDeErros);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);

class BibliotecaDeErrros {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _bibliotecaDeErros2.default.search)
    this.router.get('/', _bibliotecaDeErros2.default.all)
    this.router.post('/', _bibliotecaDeErros2.default.create)
    this.router.get('/:id', _bibliotecaDeErros2.default.find)
    this.router.post('/:id/edit', _bibliotecaDeErros2.default.update)
    this.router.post('/:id/delete', _bibliotecaDeErros2.default.delete)
  }
}

exports. default = new BibliotecaDeErrros().router
