"use strict"; Object.defineProperty(exports, "__esModule", { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _atividademodel = require('../model/atividade.model'); var _atividademodel2 = _interopRequireDefault(_atividademodel);
var _mensagemmodel = require('../model/mensagem.model'); var _mensagemmodel2 = _interopRequireDefault(_mensagemmodel);
var _statusmodel = require('../model/status.model'); var _statusmodel2 = _interopRequireDefault(_statusmodel);
var _protocoloutils = require('../utils/protocolo.utils'); var _protocoloutils2 = _interopRequireDefault(_protocoloutils);
var _areamodel = require('../model/area.model'); var _areamodel2 = _interopRequireDefault(_areamodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _classificacaomodel = require('../model/classificacao.model'); var _classificacaomodel2 = _interopRequireDefault(_classificacaomodel);
var _arquivomodel = require('../model/arquivo.model'); var _arquivomodel2 = _interopRequireDefault(_arquivomodel);
var _connection = require('../model/connection'); var _connection2 = _interopRequireDefault(_connection);
const cron = require('node-cron');

// import UsuarioAtividade from "../model/usuarioAtividade.model";
var _unidademodel = require('../model/unidade.model'); var _unidademodel2 = _interopRequireDefault(_unidademodel);
var _perfilutils = require('../utils/perfil.utils'); var _perfilutils2 = _interopRequireDefault(_perfilutils);
var _emailutils = require('../utils/email.utils'); var _emailutils2 = _interopRequireDefault(_emailutils);
var _sequelize = require('sequelize');
var _timeLineStatusmodel = require('../model/timeLineStatus.model'); var _timeLineStatusmodel2 = _interopRequireDefault(_timeLineStatusmodel);
const multer = require('multer')
const { Op } = require('sequelize')


const buscarAtividadesPendentes = async () => {
  try {
    const status = await _statusmodel2.default.findOne({ where: { nome: 'pendente' } });
    if (status) {
      const atividadesPendentes = await _atividademodel2.default.findAll({
        where: { fkStatus: _optionalChain([status, 'optionalAccess', _ => _.id]) },
        include: [
          { model: _usuariomodel2.default }
        ]
      });

      for (const atividade of atividadesPendentes) {
        let email = atividade.Usuario.email;
        const txEmail1 = `
            <b>Cadastro pendente de edição.</b><br>

        Item: <strong>${_optionalChain([atividade, 'optionalAccess', _2 => _2.titulo])}</strong><br>
        Faça os ajustes para a GLC proseguir com o processo 
        <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${_optionalChain([atividade, 'optionalAccess', _3 => _3.id])}/edit">CLIQUE PARA VER.</a><p> 
        `

        await _emailutils2.default.enviar(email, txEmail1)


      }

      console.log('Atividades Pendentes:', atividadesPendentes);
    }
  } catch (error) {
    console.error('Erro ao buscar atividades pendentes:', error);
  }
};
cron.schedule('14 16 * * *', buscarAtividadesPendentes, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});



class AtividadeController {
  async all(req, res, next) {
    throw new Error('Method not implemented.')
  }

  async create(req, res, next) {
    try {
      const {
        fkUnidade,
        fkArea,
        titulo,
        conteudo,
        categoria,
        caminho,
        tipoCadastro,
        medida,
        nomeProjeto,
        qtdItems,
        dataInicio,
        cnpj,
        razaoSocial,
        emailEmpresa,
        telefoneEmpresa,
        gPagamento,
        filial,
        gCotacao,

        centroCusto,
        eletro,
        indicacao,
        informacoes,
        dimensao,
        forma,
        material,
        cor,
        listaDeArquivosEnviados,
        setorSolicitante
      } = req.body
      console.log("a" + req.body);
      // console.log(setorSolicitante);

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }

      // if (!fkArea) {
      //   return res
      //     .status(401)
      //     .json({ message: 'O campo área deve ser preenchido corretamente.' })
      // }
      const area = await _areamodel2.default.findOne({
        where: { nome: "GLC-Cadastro de Item" }
      })


      if (!titulo) {
        return res.status(401).json({
          message: 'O campo título deve ser preenchido corretamente.'
        })
      }

      if (!conteudo) {
        return res.status(401).json({
          message: 'O campo conteudo deve ser preenchido corretamente.'
        })
      }


      const classificacao = await _classificacaomodel2.default.findOne({
        where: { nome: 'Não Definido' }
      })

      const status = await _statusmodel2.default.findOne({
        where: { nome: 'Aberto' }
      })

      const proc = _protocoloutils2.default.call(void 0,)

      if (cnpj && razaoSocial) {

        const atividade = await _atividademodel2.default.create({
          titulo,
          fkClassificacao: _optionalChain([classificacao, 'optionalAccess', _4 => _4.id]),
          protocolo: proc,
          fkArea: _optionalChain([area, 'optionalAccess', _5 => _5.id]),
          cnpj,
          razao: razaoSocial,
          email: emailEmpresa,
          gPagamento,
          filial,
          gCotacao,
          fone: telefoneEmpresa,


          detalhes: conteudo,

          fkStatus: _optionalChain([status, 'optionalAccess', _6 => _6.id]),
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho
        })

        await _mensagemmodel2.default.create({
          conteudo,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })



      } else {

        const atividade = await _atividademodel2.default.create({
          titulo,
          forma,
          material,
          cor,
          fkClassificacao: _optionalChain([classificacao, 'optionalAccess', _7 => _7.id]),
          protocolo: proc,
          fkArea: _optionalChain([area, 'optionalAccess', _8 => _8.id]),
          medida,
          centroCusto,
          indicacao,
          detalhes: conteudo,
          informacoes,
          eletro,
          dimensao,
          fkStatus: _optionalChain([status, 'optionalAccess', _9 => _9.id]),
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho
        })

        await _mensagemmodel2.default.create({
          conteudo,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })

      }

      // const emailCoordenadores = await queryInterface.sequelize.query('select email from usuario where fkArea = \'Aberto\'')
      // const status = await queryInterface.sequelize.query('select id from status where nome = \'Aberto\'')


      const atividadeSalva = await _atividademodel2.default.findOne({
        where: {
          titulo,
          protocolo: proc
        }
      })

      listaDeArquivosEnviados.map((item) => {
        _arquivomodel2.default.update(
          {
            fkAtividade: _optionalChain([atividadeSalva, 'optionalAccess', _10 => _10.id])
          },
          {
            where: { id: item.id }
          }
        )
      })

      const funcionarioDaArea = await _usuariomodel2.default.findAll({
        where: { fkArea }
      })



      await _timeLineStatusmodel2.default.create(
        {
          fkStatus: _optionalChain([status, 'optionalAccess', _11 => _11.id]),
          fkAtividade: _optionalChain([atividadeSalva, 'optionalAccess', _12 => _12.id]),
          fkUsuario: req.usuario.id
        }
      )







      const glc = await _unidademodel2.default.findOne({
        where: { nome: 'GLC' }
      })



      const txEmail1 = `
            <b>Nova Atividade para sua área.</b><br>

        Unidade: <strong>${setorSolicitante}</strong><br>
        Titulo: <strong>${titulo}</strong><br>
          Mensagem: <strong>${conteudo}</strong><br>
        <br/>
        <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${_optionalChain([atividadeSalva, 'optionalAccess', _13 => _13.id])}/edit">CLIQUE PARA VER.</a><p>  
        `
      let destinatarios = '';

      funcionarioDaArea.forEach((usuario, index) => {
        destinatarios += `${usuario.email};`;
      });

      _emailutils2.default.enviar(destinatarios, txEmail1);





      res
        .status(200)
        .json({ message: 'Cadastro realizado com sucesso.' })
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

  async createProjeto(req, res, next) {
    try {
      const {
        fkUnidade,
        fkArea,
        titulo,
        conteudo,
        categoria,
        caminho,
        tipoCadastro,
        medida,
        nomeProjeto,
        qtdItems,
        dataInicio,
        cnpj,
        razaoSocial,
        emailEmpresa,
        telefoneEmpresa,
        gPagamento,
        filial,
        gCotacao,

        centroCusto,
        eletro,
        indicacao,
        informacoes,
        dimensao,
        forma,
        material,
        cor,
        listaDeArquivosEnviados,
        setorSolicitante
      } = req.body
      console.log("a" + req.body);
      // console.log(setorSolicitante);

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }

      // if (!fkArea) {
      //   return res
      //     .status(401)
      //     .json({ message: 'O campo área deve ser preenchido corretamente.' })
      // }
      const area = await _areamodel2.default.findOne({
        where: { nome: "GLC-Cadastro de Item" }
      })


      if (!titulo) {
        return res.status(401).json({
          message: 'O campo título deve ser preenchido corretamente.'
        })
      }

      if (!conteudo) {
        return res.status(401).json({
          message: 'O campo conteudo deve ser preenchido corretamente.'
        })
      }


      const classificacao = await _classificacaomodel2.default.findOne({
        where: { nome: 'Não Definido' }
      })

      const status = await _statusmodel2.default.findOne({
        where: { nome: 'Aberto' }
      })

      const proc = _protocoloutils2.default.call(void 0,)



      await _mensagemmodel2.default.create({
        conteudo,
        fkAtividade: atividade.id,
        fkUsuario: req.usuario.id
        
      })



      // const emailCoordenadores = await queryInterface.sequelize.query('select email from usuario where fkArea = \'Aberto\'')
      // const status = await queryInterface.sequelize.query('select id from status where nome = \'Aberto\'')


      const atividadeSalva = await _atividademodel2.default.findOne({
        where: {
          titulo,
          protocolo: proc
        }
      })



      const funcionarioDaArea = await _usuariomodel2.default.findAll({
        where: { fkArea }
      })



      await _timeLineStatusmodel2.default.create(
        {
          fkStatus: _optionalChain([status, 'optionalAccess', _11 => _11.id]),
          fkAtividade: _optionalChain([atividadeSalva, 'optionalAccess', _12 => _12.id]),
          fkUsuario: req.usuario.id
        }
      )







      const glc = await _unidademodel2.default.findOne({
        where: { nome: 'GLC' }
      })



      const txEmail1 = `
            <b>Nova Atividade para sua área.</b><br>

        Unidade: <strong>${setorSolicitante}</strong><br>
        Titulo: <strong>${titulo}</strong><br>
          Mensagem: <strong>${conteudo}</strong><br>
        <br/>
        <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${_optionalChain([atividadeSalva, 'optionalAccess', _13 => _13.id])}/edit">CLIQUE PARA VER.</a><p>  
        `
      let destinatarios = '';

      funcionarioDaArea.forEach((usuario, index) => {
        destinatarios += `${usuario.email};`;
      });

      // _emailutils2.default.enviar(destinatarios, txEmail1);





      res
        .status(200)
        .json({ message: 'Cadastro realizado com sucesso.' })
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

  async find(req, res, next) {
    try {
      const { id } = req.params

      const registro = await _atividademodel2.default.findOne({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          _areamodel2.default,
          _classificacaomodel2.default,
          _statusmodel2.default,
          _usuariomodel2.default
        ],
        where: { id }
      })

      console.log('jjjjjjj'+registro)

      res.status(200).json({ data: registro })
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

  async update(req, res, next) {
    try {
      const { id } = req.params
      // console.log(id)
      const { fkStatus, arquivado, tempoEstimado,
        centroCusto,
        forma,
        dimensao,
        material,
        eletro,
        medida,
        editar,
        indicacao,
        cor,
        informacoes,
        idAtividade,
        logged



      } = req.body
      console.log('lll' + editar)



      await _atividademodel2.default.update(
        {
          fkStatus,
          arquivado,
          tempoEstimado,
          centroCusto,
          forma,
          editar,
          dimensao,
          cor,
          material,
          eletro,
          medida,
          indicacao,
          informacoes,
        },
        {
          where: {
            id
          },
          individualHooks: false
        }
      )

      if (logged && idAtividade) {

        await _timeLineStatusmodel2.default.create(
          {
            fkStatus,
            fkAtividade: idAtividade,
            fkUsuario: logged
          }
        )

      }


      // if (newStatus) {
      //   const status1 = status?.nome
      //   const txEmail = 'Atividade: \n' + titulo + ' \nStautus alterado para ' + status1;

      //   // emailUtils.enviar(email, txEmail)
      // }

      const registro = await _atividademodel2.default.findOne({ where: { id } })
      res
        .status(200)
        .json({ data: registro, message: 'Alteração realizada com sucesso.' })
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

  async todasAsPendencias(
    req,
    res,
    next
  ) {
    try {
      // const status = await queryInterface.sequelize.query('select id from status where nome = \'Aberto\'')
      const statusPendente = await _statusmodel2.default.findOne({
        where: { nome: 'Pendente' }
      })
      const statusConcluido = await _statusmodel2.default.findOne({
        where: { nome: 'Concluido' }
      })
      const statusCancelado = await _statusmodel2.default.findOne({
        where: { nome: 'Cancelado' }
      })
      const statusParado = await _statusmodel2.default.findOne({ where: { nome: 'Parado' } })
      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              _optionalChain([statusPendente, 'optionalAccess', _14 => _14.id]),
              _optionalChain([statusConcluido, 'optionalAccess', _15 => _15.id]),
              _optionalChain([statusCancelado, 'optionalAccess', _16 => _16.id]),
              _optionalChain([statusParado, 'optionalAccess', _17 => _17.id])
            ]
          }
        }
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

  async minhasAtividades(
    req,
    res,
    next
  ) {
    try {
      const statusAberto = await _statusmodel2.default.findOne({ where: { nome: 'Aberto' } })
      const statusIniciado = await _statusmodel2.default.findOne({
        where: { nome: 'Iniciado' }
      })
      const statusPlanejado = await _statusmodel2.default.findOne({
        where: { nome: 'Planejado para Iniciar' }
      })
      const statusPendente = await _statusmodel2.default.findOne({
        where: { nome: 'Pendente' }
      })
      const statusParado = await _statusmodel2.default.findOne({ where: { nome: 'Parado' } })

      const claImediata = await _classificacaomodel2.default.findOne({
        where: { nome: 'Execução Imediata' }
      })
      const claUrgente = await _classificacaomodel2.default.findOne({
        where: { nome: 'Urgente' }
      })
      const claImportente = await _classificacaomodel2.default.findOne({
        where: { nome: 'Importante' }
      })
      const claCircunstancial = await _classificacaomodel2.default.findOne({
        where: { nome: 'Circunstancial' }
      })

      const claNaoDef = await _classificacaomodel2.default.findOne({
        where: { nome: 'Não Definido' }
      })

      // const registros = await Atividade.findAll({
      //   include: [
      //     { model: Area, include: [Unidade] },
      //     Classificacao,
      //     Status,
      //     Usuario
      //   ],
      //   where: {
      //     fkUsuarioExecutor: req.usuario.id,
      //     arquivado: false,
      //     fkStatus: {
      //       [Op.or]: [statusAberto?.id, statusIniciado?.id]
      //     }
      //   },
      //   order:[
      //     ['createdAt', 'DESC']
      //   ]
      // });

      const registrosImediatos = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkClassificacao: _optionalChain([claImediata, 'optionalAccess', _18 => _18.id]),
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              _optionalChain([statusAberto, 'optionalAccess', _19 => _19.id]),
              _optionalChain([statusIniciado, 'optionalAccess', _20 => _20.id]),
              _optionalChain([statusPlanejado, 'optionalAccess', _21 => _21.id]),
              _optionalChain([statusPendente, 'optionalAccess', _22 => _22.id]),
              _optionalChain([statusParado, 'optionalAccess', _23 => _23.id])
            ]
          }
        }
      })

      const registrosUrgentes = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkClassificacao: _optionalChain([claUrgente, 'optionalAccess', _24 => _24.id]),
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              _optionalChain([statusAberto, 'optionalAccess', _25 => _25.id]),
              _optionalChain([statusIniciado, 'optionalAccess', _26 => _26.id]),
              _optionalChain([statusPlanejado, 'optionalAccess', _27 => _27.id]),
              _optionalChain([statusPendente, 'optionalAccess', _28 => _28.id]),
              _optionalChain([statusParado, 'optionalAccess', _29 => _29.id])
            ]
          }
        }
      })

      const registrosImportantes = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkClassificacao: _optionalChain([claImportente, 'optionalAccess', _30 => _30.id]),
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              _optionalChain([statusAberto, 'optionalAccess', _31 => _31.id]),
              _optionalChain([statusIniciado, 'optionalAccess', _32 => _32.id]),
              _optionalChain([statusPlanejado, 'optionalAccess', _33 => _33.id]),
              _optionalChain([statusPendente, 'optionalAccess', _34 => _34.id]),
              _optionalChain([statusParado, 'optionalAccess', _35 => _35.id])
            ]
          }
        }
      })

      const registroCircunstancial = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkClassificacao: _optionalChain([claCircunstancial, 'optionalAccess', _36 => _36.id]),
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              _optionalChain([statusAberto, 'optionalAccess', _37 => _37.id]),
              _optionalChain([statusIniciado, 'optionalAccess', _38 => _38.id]),
              _optionalChain([statusPlanejado, 'optionalAccess', _39 => _39.id]),
              _optionalChain([statusPendente, 'optionalAccess', _40 => _40.id]),
              _optionalChain([statusParado, 'optionalAccess', _41 => _41.id])
            ]
          }
        }
      })

      const registroNaoDefinidos = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkClassificacao: _optionalChain([claNaoDef, 'optionalAccess', _42 => _42.id]),
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              _optionalChain([statusAberto, 'optionalAccess', _43 => _43.id]),
              _optionalChain([statusIniciado, 'optionalAccess', _44 => _44.id]),
              _optionalChain([statusPlanejado, 'optionalAccess', _45 => _45.id]),
              _optionalChain([statusPendente, 'optionalAccess', _46 => _46.id]),
              _optionalChain([statusParado, 'optionalAccess', _47 => _47.id])
            ]
          }
        }
      })
      const registosOrdenados = [
        ...registrosImediatos,
        ...registrosUrgentes,
        ...registrosImportantes,
        ...registroCircunstancial
      ]

      res.status(200).json({ data: registosOrdenados })
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

  async minhasAtividadesArquivadas(
    req,
    res,
    next
  ) {
    try {
      const statusConcluido = await _statusmodel2.default.findOne({
        where: { nome: 'Concluido' }
      })
      const statusCancelado = await _statusmodel2.default.findOne({
        where: { nome: 'Cancelado' }
      })

      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: {
          fkUsuarioExecutor: req.usuario.id,
          [Op.or]: [
            { arquivado: true },
            { fkStatus: _optionalChain([statusConcluido, 'optionalAccess', _48 => _48.id]) },
            { fkStatus: _optionalChain([statusCancelado, 'optionalAccess', _49 => _49.id]) }
          ]
        }
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

  async recebidasSetor(
    req,
    res,
    next
  ) {
    try {
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _50 => _50.fkUnidade]),
          [Op.or]: [
            { '$Status.nome$': 'Iniciado' },
            { '$Status.nome$': 'Aberto' },
            { '$Status.nome$': 'Parado' },
            { '$Status.nome$': 'Planejado para Iniciar' },
            { '$Status.nome$': 'Pendente' }
            // { '$Status.nome$': 'Concluido' },

          ]

        }
      })
      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: 'fkUnidade é inválido ou indefinido.' })
    }
  }

  async recebidasSetorCount(
    req,
    res,
    next
  ) {
    try {
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _51 => _51.fkUnidade]),
          [Op.or]: [
            { '$Status.nome$': 'Iniciado' },
            { '$Status.nome$': 'Aberto' },
            // { '$Status.nome$': 'Parado' },
            // { '$Status.nome$': 'Planejado para Iniciar' },
            // { '$Status.nome$': 'Pendente' }
            // { '$Status.nome$': 'Concluido' },

          ]

        }
      })
      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: 'fkUnidade é inválido ou indefinido.' })
    }
  }

  async solicitadasSetor(
    req,
    res,
    next
  ) {
    try {
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          '$Usuario.fkArea$': _optionalChain([area, 'optionalAccess', _52 => _52.id])

        }
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

  async delete(req, res, next) {
    throw new Error('Method not implemented.')
  }

  // async upload(req: Request, res: Response, next: NextFunction): Promise<any> {
  //   try {
  //     const storage = multer.diskStorage({
  //       destination: function (req, file, cb) {
  //         cb(null, 'uploads')
  //       },
  //       filename: function (req, file, cb) {
  //         cb(null, file.originalname)
  //       }
  //     })

  //     const upload = multer({ storage: storage })
  //     upload.single('file')
  //     res.send('cadastrado')

  //   } catch (err) {
  //     console.log(err);
  //     if (typeof err.errors[0].message === "undefined") {
  //   res.status(401).json({ message: JSON.stringify(err) });
  // } else {
  //   res.status(401).json({ message: err.errors[0].message });
  // }
  //   }
  // }

  async search(req, res, next) {
    try {
      const { pesquisa } = req.query

      // const unidade = await Unidade.findOne({ where: { id: req.usuario.area.fkUnidade } });
      // const { Usuario } = req;
      // console.log(JSON.stringify(unidade))

      // console.log('pesquisa: ' + pesquisa);
      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          // "$UsuarioExecutor.Area.fkUnidade$": req.usuario.area.fkUnidade,
          // "$Area.fkUnidade$" : unidade?.id,
          arquivado: false,

          [Op.or]: [
            // { titulo: { [Op.like]: `%${pesquisa}%` } },
            { protocolo: { [Op.like]: `${pesquisa}` } },
            { categoria: { [Op.like]: `${pesquisa}` } },
            { '$Area.nome$': { [Op.like]: `${pesquisa}` } },
            { '$UsuarioExecutor.nome$': { [Op.like]: `${pesquisa}` } },
            { '$Usuario.nome$': { [Op.like]: `${pesquisa}` } },
            {
              '$UsuarioExecutor.Area.Unidade.nome$': {
                [Op.like]: `${pesquisa}`
              }
            }

            // {"$Mensagem$.conteudo" : { [Op.like]: `%${pesquisa}%`} }
          ]
        }
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

  async searchRecebidos(
    req,
    res,
    next
  ) {
    try {
      const { pesquisa } = req.query
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      console.log('pesquisa: ' + pesquisa)
      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          // fkArea: req.usuario.fkArea ,
          '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _53 => _53.fkUnidade]),

          [Op.or]: [
            { fkUsuarioExecutor: pesquisa },
            { fkStatus: pesquisa },
            { fkClassificacao: pesquisa }
          ]
        }
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

  async searchSolicitadas(
    req,
    res,
    next
  ) {
    try {
      const { pesquisa } = req.query
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })

      console.log('pesquisa: ' + pesquisa)
      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          // fkArea: req.usuario.fkArea ,
          // "$Area.fkUnidade$": area?.fkUnidade,
          fkStatus: pesquisa,

          [Op.or]: [{ '$Usuario.fkArea$': _optionalChain([area, 'optionalAccess', _54 => _54.id]) }]
        }
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

  async naoatribuida(
    req,
    res,
    next
  ) {
    try {
      // console.log(`${req.usuario.nome} - ${req.usuario.fkArea}`)
      const area = await _areamodel2.default.findOne({ where: { id: req.usuario.fkArea } })
      // console.log(req.usuario)
      let whereCustum = {
        pessoal: false,
        fkUsuarioExecutor: null,
        '$Area.fkUnidade$': _optionalChain([area, 'optionalAccess', _55 => _55.fkUnidade])
      }

      if (req.usuario.Perfil.nome == _perfilutils2.default.Coordenador) {
        whereCustum = { ...whereCustum, '$Area.id$': _optionalChain([area, 'optionalAccess', _56 => _56.id]) }
      }

      const registros = await _atividademodel2.default.findAll({
        include: [
          { model: _areamodel2.default, include: [_unidademodel2.default] },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        where: whereCustum
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

  async atividadesRecebidas(
    req,
    res,
    next
  ) {
    try {
      // const area = await Area.findOne({ where: { id: req.usuario.fkArea } });
      const status = await _statusmodel2.default.findOne({ where: { nome: 'Aberto' } })

      const registros = await _atividademodel2.default.findAll({
        include: [
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          fkUsuarioExecutor: req.usuario.id,
          fkStatus: _optionalChain([status, 'optionalAccess', _57 => _57.id])
        }
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

  async chamadosAbertos(
    req,
    res,
    next
  ) {
    try {
      const registros = await _atividademodel2.default.findAll({
        include: [
          _classificacaomodel2.default,
          _statusmodel2.default,
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          },
          {
            model: _usuariomodel2.default,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: _areamodel2.default, include: [_unidademodel2.default] }]
          }
        ],

        order: [['createdAt', 'DESC']],
        where: {
          fkUsuarioSolicitante: req.usuario.id
        }
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

  async termo(req, res, next) {
    try {
      const { cpfTermo } = req.params; // Agora você está acessando os parâmetros da URL

      console.log(cpfTermo);

      const sql = `
      SELECT cpf
      FROM TermoAceite.dbo.Colaborador C
      INNER JOIN TermoAceite.dbo.Timeline TL ON C.ID = TL.idColaborador
      WHERE TL.idStatusTimeline = '3' AND CPF = '${cpfTermo}'
    `;


      const registro = await _connection2.default.query(sql, { type: _sequelize.QueryTypes.SELECT });


      // const registro = await Atividade.sequelize?.query(`
      //   SELECT cpf
      //   FROM TermoAceite.dbo.Colaborador C
      //   INNER JOIN TermoAceite.dbo.Timeline TL ON C.ID = TL.idColaborador
      //   WHERE TL.idStatusTimeline = '3' AND CPF = '${cpfTermo}'
      // `);

      console.log(JSON.stringify(registro));

      if (registro.length > 0) {
        console.log("Registros encontrados:", registro[0]);
        res.status(200).json({ message: 'Termo de Compromisso assinado, prossiga com o chamado' });
      } else {
        console.log("Nenhum registro encontrado.");
        res.status(200).json({ message: 'Termo de compromisso pendente, resolva para abrir o chamado.' });
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err.message });
    }
  }
}

exports.default = new AtividadeController()
