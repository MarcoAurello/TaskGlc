"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _atividadecontroller = require('../controller/atividade.controller'); var _atividadecontroller2 = _interopRequireDefault(_atividadecontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);
// import PerfilUtils from '../utils/perfil.utils'

class AtividadeRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    // this.router.get('/ordenar/', controller.ordenar)
    this.router.get('/naoatribuida/', _atividadecontroller2.default.naoatribuida)
    this.router.get('/atividadesRecebidas/', _atividadecontroller2.default.atividadesRecebidas)
    this.router.get('/search/', _atividadecontroller2.default.search)
    this.router.get('/searchRecebidos/', _atividadecontroller2.default.searchRecebidos)
    this.router.get('/searchSolicitadas/', _atividadecontroller2.default.searchSolicitadas)
    this.router.get('/', _atividadecontroller2.default.all)
    this.router.get('/recebidasSetor', _atividadecontroller2.default.recebidasSetor)
    this.router.get('/recebidasSetorCount', _atividadecontroller2.default.recebidasSetorCount)
    this.router.get('/solicitadasSetor', _atividadecontroller2.default.solicitadasSetor)
    this.router.get('/chamadosAbertos', _atividadecontroller2.default.chamadosAbertos)
    this.router.get('/minhasAtividades', _atividadecontroller2.default.minhasAtividades)
    this.router.get('/todasAsPendencias', _atividadecontroller2.default.todasAsPendencias)
    this.router.get('/minhasAtividadesArquivadas/', _atividadecontroller2.default.minhasAtividadesArquivadas)
    this.router.post('/createProjeto', _atividadecontroller2.default.createProjeto)
    this.router.post('/createMr', _atividadecontroller2.default.createMr)
    this.router.post('/createAjuste', _atividadecontroller2.default.createAjuste)
    this.router.post('/', _atividadecontroller2.default.create)
    this.router.get('/termo/:cpfTermo', _atividadecontroller2.default.termo);

    this.router.get('/:id', _atividadecontroller2.default.find)
    this.router.post('/:id/edit', _atividadecontroller2.default.update)
    this.router.post('/:id/delete', _atividadecontroller2.default.delete)
  }
}

exports. default = new AtividadeRouter().router
