import controller from '../controller/usuario.controller'
import { Router } from 'express'

import routerMiddleware from '../middleware/router.middleware'
import PerfilUtils from '../utils/perfil.utils'

class UsuarioRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

  private routers () {
    this.router.get('/search/', controller.search)
    this.router.get('/', routerMiddleware.role([PerfilUtils.Administrador]), controller.all)
    this.router.post('/', controller.create)
    this.router.get('/:id', controller.find)
    this.router.post('/:id/edit', controller.update)
    this.router.post('/:id/delete', controller.delete)
  }
}

export default new UsuarioRouter().router
