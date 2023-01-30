import express, { json } from 'express'
import cors from 'cors'

import routerStatusApplication from './router/statusapplicatoin.router'
import routerAuthentication from './router/authentication.router'
import routerUsuario from './router/usuario.router'
import routerUnidade from './router/unidade.router'

class Server {
  public application!: express.Application

  constructor () {
    this.application = express()
    this.middlewares()
    this.routers()
  }

  private middlewares () {
    this.application.use(json())
    this.application.use(cors())
  }

  private routers () {
    this.application.use('/api/statusapplication/', routerStatusApplication)
    this.application.use('/api/authentication/', routerAuthentication)
    this.application.use('/api/usuario/', routerUsuario)
    this.application.use('/api/unidade/', routerUnidade)
  }
}

export default new Server().application
