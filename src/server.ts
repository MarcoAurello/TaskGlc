import express, { json } from 'express'
import cors from 'cors'

import routerAuthentication from './router/authentication.router'
import routerUsuario from './router/usuario.router'
import routerUnidade from './router/unidade.router'
import routerArea from './router/area.router'
import routerPerfil from './router/perfil.router'
import routerConfiguracaoGlobal from './router/configuracaoGlobal.router'
import routerStatus from './router/status.router'
import routerAtividade from './router/atividade.router'
import routerMensagem from './router/mensagem.router'
import routerUsuarioAtividade from './router/usuarioAtividade.router'
import routerClassificacao from './router/classificacao.router'
import routerUsuarioDemandado from './router/usurarioDemandado.router'
import routerSubArea from './router/subarea.router'
import routerArquivo from './router/arquivo.router'

import fileUpload from 'express-fileupload'


const path = require('path')

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
    this.application.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 }
    }))
  }

  private routers () {
    this.application.use('/api/authentication/', routerAuthentication)
    this.application.use('/api/usuario/', routerUsuario)
    this.application.use('/api/usuarioDemandado/', routerUsuarioDemandado)
    this.application.use('/api/unidade/', routerUnidade)
    this.application.use('/api/area/', routerArea)
    this.application.use('/api/perfil/', routerPerfil)
    this.application.use('/api/configuracao/', routerConfiguracaoGlobal)
 
    this.application.use('/api/status/', routerStatus)
    this.application.use('/api/atividade/', routerAtividade)
    this.application.use('/api/mensagem/', routerMensagem)
    this.application.use('/api/usuarioAtividade/', routerUsuarioAtividade)
    this.application.use('/api/classificacao/', routerClassificacao)
    this.application.use('/api/subarea/', routerSubArea)
    this.application.use('/api/arquivo/', routerArquivo)

    this.application.use(express.static(path.resolve('app', 'build')))
    this.application.get('/*', (req, res) =>
      res.sendFile(path.resolve('app', 'build', 'index.html'))
    )
  }
}

export default new Server().application
