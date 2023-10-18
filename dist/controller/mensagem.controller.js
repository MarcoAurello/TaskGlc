"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _atividademodel = require('../model/atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);
var _mensagemmodel = require('../model/mensagem.model'); var _mensagemmodel2 = _interopRequireDefault(_mensagemmodel);

var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _emailutils = require('../utils/email.utils'); var _emailutils2 = _interopRequireDefault(_emailutils);

var _arquivomodel = require('../model/arquivo.model'); var _arquivomodel2 = _interopRequireDefault(_arquivomodel);
var _areamodel = require('../model/area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);

class MensagemController  {
  async all (req, res, next) {
    try {
      const { fkAtividade } = req.query

      const registros = await _mensagemmodel2.default.findAll({
        where: { fkAtividade },
        include: [_usuariomodel2.default],
        order: [['createdAt', 'desc']]
      })

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }

  async create (req, res, next) {
    try {
      const {
        fkAtividade,
        conteudo,
        email,
        emailExecutor,
        caminho,
        listaDeArquivosEnviados
      } = req.body
      const titulo = await _atividademodel2.default.findOne({ where: { id: fkAtividade } })
      // const status = await Atividade.findOne({where: { id: fkAtividade } })
      // console.log(titulo?.fkStatus)
      await _mensagemmodel2.default.create({
        fkAtividade,
        conteudo,
        fkUsuario: req.usuario.id
      })

      await _atividademodel2.default.update(
        {
          fkStatus: _optionalChain([titulo, 'optionalAccess', _ => _.fkStatus])
        },
        {
          where: {
            id: fkAtividade
          }
        }
      )
      if (caminho) {
        await _atividademodel2.default.update(
          {
            caminho
          },
          {
            where: {
              id: fkAtividade
            }
          }
        )

        const atividadeSalva = await _atividademodel2.default.findOne({
          where: { titulo: _optionalChain([titulo, 'optionalAccess', _2 => _2.titulo]) }
        })

        listaDeArquivosEnviados.map((item) => {
          _arquivomodel2.default.update(
            {
              fkAtividade: _optionalChain([atividadeSalva, 'optionalAccess', _3 => _3.id])
            },
            {
              where: { id: item.id }
            }
          )
        })
      }

      const executor = await _usuariomodel2.default.findOne({
        where: { email: emailExecutor }
      })
      const solicitante = await _usuariomodel2.default.findOne({ where: { email } })

      const Manutencao = await _areamodel2.default.findOne({
        where: {
          nome: 'Manutenção- Elétrica / Hidráulica / Refrigeração/ Mecânica'
        }
      })

      if (
        _optionalChain([executor, 'optionalAccess', _4 => _4.fkArea]) === _optionalChain([Manutencao, 'optionalAccess', _5 => _5.id]) ||
        _optionalChain([solicitante, 'optionalAccess', _6 => _6.fkArea]) === _optionalChain([Manutencao, 'optionalAccess', _7 => _7.id])
      ) {
        const txEmail = `
        <b>Atividade: ${_optionalChain([titulo, 'optionalAccess', _8 => _8.titulo])}</b> tem nova interação<br>
        <a href="https://www7.pe.senac.br/taskmanager/atividade/${_optionalChain([titulo, 'optionalAccess', _9 => _9.id])}/edit">CLIQUE PARA VER</a><p>
    `
        _emailutils2.default.enviar('lucascruz@pe.senac.br', txEmail)
        _emailutils2.default.enviar('karenMiranda@pe.senac.br', txEmail)
        _emailutils2.default.enviar('gabrielvilela@pe.senac.br', txEmail)
      }

      const txEmail = `
      <b>Atividade: ${_optionalChain([titulo, 'optionalAccess', _10 => _10.titulo])}</b> tem nova interação<br>
      <a href="https://www7.pe.senac.br/taskmanager/atividade/${_optionalChain([titulo, 'optionalAccess', _11 => _11.id])}/edit">CLIQUE PARA VER</a><p>
  `

      _emailutils2.default.enviar(email, txEmail)

      if (emailExecutor) {
        _emailutils2.default.enviar(emailExecutor, txEmail)
      }

      const atividade = await _atividademodel2.default.findOne({ where: { id: fkAtividade } })

      res
        .status(200)
        .json({ data: atividade, message: 'Cadastro realizado com sucesso.' })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }

  async mensagemPrimeira (
    req,
    res,
    next
  ) {
    try {
      const { fkAtividade } = req.query

      const registros = await _mensagemmodel2.default.findAll({
        where: { fkAtividade }
      })

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }

  async find (req, res, next) {
    try {
      const { fkAtividade } = req.query

      const registros = await _mensagemmodel2.default.findAll({
        where: { fkAtividade }
      })

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }

  async update (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }
}

exports. default = new MensagemController()
