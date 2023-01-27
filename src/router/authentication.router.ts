import controller from '../controller/authentication.controller'
import { Router } from 'express'

class AuthenticationRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    this.routers()
  }

  private routers () {
    this.router.post('/', controller.login)
  }
}

export default new AuthenticationRouter().router
