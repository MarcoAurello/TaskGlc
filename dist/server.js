"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

var _authenticationrouter = require('./router/authentication.router'); var _authenticationrouter2 = _interopRequireDefault(_authenticationrouter);
var _usuariorouter = require('./router/usuario.router'); var _usuariorouter2 = _interopRequireDefault(_usuariorouter);
var _unidaderouter = require('./router/unidade.router'); var _unidaderouter2 = _interopRequireDefault(_unidaderouter);
var _arearouter = require('./router/area.router'); var _arearouter2 = _interopRequireDefault(_arearouter);
var _perfilrouter = require('./router/perfil.router'); var _perfilrouter2 = _interopRequireDefault(_perfilrouter);
var _configuracaoGlobalrouter = require('./router/configuracaoGlobal.router'); var _configuracaoGlobalrouter2 = _interopRequireDefault(_configuracaoGlobalrouter);
var _statusrouter = require('./router/status.router'); var _statusrouter2 = _interopRequireDefault(_statusrouter);
var _atividaderouter = require('./router/atividade.router'); var _atividaderouter2 = _interopRequireDefault(_atividaderouter);
var _mensagemrouter = require('./router/mensagem.router'); var _mensagemrouter2 = _interopRequireDefault(_mensagemrouter);
var _usuarioAtividaderouter = require('./router/usuarioAtividade.router'); var _usuarioAtividaderouter2 = _interopRequireDefault(_usuarioAtividaderouter);
var _classificacaorouter = require('./router/classificacao.router'); var _classificacaorouter2 = _interopRequireDefault(_classificacaorouter);
var _usurarioDemandadorouter = require('./router/usurarioDemandado.router'); var _usurarioDemandadorouter2 = _interopRequireDefault(_usurarioDemandadorouter);
var _subarearouter = require('./router/subarea.router'); var _subarearouter2 = _interopRequireDefault(_subarearouter);
var _arquivorouter = require('./router/arquivo.router'); var _arquivorouter2 = _interopRequireDefault(_arquivorouter);
var _emailrouter = require('./router/email.router'); var _emailrouter2 = _interopRequireDefault(_emailrouter);
var _timeLineStatusrouter = require('./router/timeLineStatus.router'); var _timeLineStatusrouter2 = _interopRequireDefault(_timeLineStatusrouter);



var _questionariorouter = require('./router/questionario.router'); var _questionariorouter2 = _interopRequireDefault(_questionariorouter);





var _bibliotecaDeErrosrouter = require('./router/bibliotecaDeErros.router'); var _bibliotecaDeErrosrouter2 = _interopRequireDefault(_bibliotecaDeErrosrouter);

var _expressfileupload = require('express-fileupload'); var _expressfileupload2 = _interopRequireDefault(_expressfileupload);


const path = require('path')

class Server {
  

  constructor () {
    this.application = _express2.default.call(void 0, )
    this.middlewares()
    this.routers()
  }

   middlewares () {
    this.application.use(_express.json.call(void 0, ))
    this.application.use(_cors2.default.call(void 0, ))
    this.application.use(_expressfileupload2.default.call(void 0, {
      limits: { fileSize: 50 * 1024 * 1024 }
    }))
  }

   routers () {
    this.application.use('/api/authentication/', _authenticationrouter2.default)
    this.application.use('/api/usuario/', _usuariorouter2.default)
    this.application.use('/api/usuarioDemandado/', _usurarioDemandadorouter2.default)
    this.application.use('/api/unidade/', _unidaderouter2.default)
    this.application.use('/api/area/', _arearouter2.default)
    this.application.use('/api/perfil/', _perfilrouter2.default)
    this.application.use('/api/timeLineStatus/', _timeLineStatusrouter2.default)
    this.application.use('/api/configuracao/', _configuracaoGlobalrouter2.default)
 
    this.application.use('/api/status/', _statusrouter2.default)
    this.application.use('/api/atividade/', _atividaderouter2.default)
    this.application.use('/api/mensagem/', _mensagemrouter2.default)
    this.application.use('/api/usuarioAtividade/', _usuarioAtividaderouter2.default)
    this.application.use('/api/classificacao/', _classificacaorouter2.default)
    this.application.use('/api/subarea/', _subarearouter2.default)
    this.application.use('/api/arquivo/', _arquivorouter2.default)
    this.application.use('/api/email/', _emailrouter2.default)
    this.application.use('/api/questionario/', _questionariorouter2.default)

    this.application.use('/api/bibliotecaDeErros/', _bibliotecaDeErrosrouter2.default)
    this.application.get('/api/status', (req, res) => {
      res.status(200).json({message: 'The server is running on port 3354'})
    })

    this.application.use(_express2.default.static(path.resolve('app', 'build')))
    this.application.get('/*', (req, res) =>
      res.sendFile(path.resolve('app', 'build', 'index.html'))
    )
  }
}

exports. default = new Server().application
