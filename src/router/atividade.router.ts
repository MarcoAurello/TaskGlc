import controller from '../controller/atividade.controller'
import { Router } from 'express'

import routerMiddleware from '../middleware/router.middleware'
// import PerfilUtils from '../utils/perfil.utils'

class AtividadeRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

  private routers () {
    // this.router.get('/ordenar/', controller.ordenar)
    this.router.get('/naoatribuida/', controller.naoatribuida)
    this.router.get('/atividadesRecebidas/', controller.atividadesRecebidas)
    this.router.get('/search/', controller.search)
    this.router.get('/searchRecebidos/', controller.searchRecebidos)
    this.router.get('/searchSolicitadas/', controller.searchSolicitadas)
    this.router.get('/', controller.all)
    this.router.get('/recebidasSetor', controller.recebidasSetor)
    this.router.get('/recebidasSetorCount', controller.recebidasSetorCount)
    this.router.get('/solicitadasSetor', controller.solicitadasSetor)
    this.router.get('/chamadosAbertos', controller.chamadosAbertos)
    this.router.get('/minhasAtividades', controller.minhasAtividades)
    this.router.get('/todasAsPendencias', controller.todasAsPendencias)
    this.router.get('/minhasAtividadesArquivadas/', controller.minhasAtividadesArquivadas)
    this.router.post('/', controller.create)
    this.router.post('/termo', controller.termo);
    this.router.get('/:id', controller.find)
    this.router.post('/:id/edit', controller.update)
    this.router.post('/:id/delete', controller.delete)
  }
}

export default new AtividadeRouter().router
