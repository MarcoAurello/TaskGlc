import controller from '../controller/contrato.controller'
import { Router } from 'express'
import routerMiddleware from '../middleware/router.middleware'

class ContratoRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    this.routers()
  }

  private routers () {
   
    // 🔓 Rota livre (sem autenticação)
    this.router.get('/', controller.all)
    this.router.get('/', controller.setor)
    

    // 🛡️ Middleware de autenticação aplicado nas rotas abaixo
    this.router.use(routerMiddleware.authenticated)

    this.router.get('/search/', controller.search)
    this.router.post('/', controller.create)
    
    this.router.get('/:id', controller.find)
    this.router.post('/:id/edit', controller.update)
    this.router.post('/:id/delete', controller.delete)
  }
}

export default new ContratoRouter().router
