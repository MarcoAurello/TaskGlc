import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Atividade from '../model/atividade.model'
import Mensagem from '../model/mensagem.model'
import Status from '../model/status.model'
import protocolo from '../utils/protocolo.utils'
import Area from '../model/area.model'
import Usuario from '../model/usuario.model'
import Classificacao from '../model/classificacao.model'
import Arquivo from '../model/arquivo.model'

// import UsuarioAtividade from "../model/usuarioAtividade.model";
import Unidade from '../model/unidade.model'
import PerfilUtils from '../utils/perfil.utils'
import emailUtils from '../utils/email.utils'
const multer = require('multer')
const { Op } = require('sequelize')

class AtividadeController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        fkUnidade,
        fkArea,
        titulo,
        conteudo,
        categoria,
        caminho,
        listaDeArquivosEnviados,
        setorSolicitante
      } = req.body
      // console.log(req.body);
      // console.log(setorSolicitante);

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }

      if (!fkArea) {
        return res
          .status(401)
          .json({ message: 'O campo área deve ser preenchido corretamente.' })
      }

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

      const classificacao = await Classificacao.findOne({
        where: { nome: 'Não Definido' }
      })

      const status = await Status.findOne({
        where: { nome: 'Aberto' }
      })

      const atividade = await Atividade.create({
        titulo,
        fkClassificacao: classificacao?.id,
        protocolo: protocolo(),
        fkArea,
        fkStatus: status?.id,
        fkUsuarioSolicitante: req.usuario.id,
        arquivado: false,
        pessoal: false,
        // fkUsuarioExecutor,
        categoria,
        caminho
      })

      // const emailCoordenadores = await queryInterface.sequelize.query('select email from usuario where fkArea = \'Aberto\'')
      // const status = await queryInterface.sequelize.query('select id from status where nome = \'Aberto\'')

      await Mensagem.create({
        conteudo,
        fkAtividade: atividade.id,
        fkUsuario: req.usuario.id
      })

      const atividadeSalva = await Atividade.findOne({
        where: { titulo }
      })

      listaDeArquivosEnviados.map((item) => {
        Arquivo.update(
          {
            fkAtividade: atividadeSalva?.id
          },
          {
            where: { id: item.id }
          }
        )
      })


      
     

      const funcionarioDaArea = await Usuario.findAll({
        where: { fkArea }
      })

      console.log(JSON.stringify("teste"+funcionarioDaArea))

      
      const gti = await Unidade.findOne({
        where: { nome :'GTI' }
      })
      // console.log('jjjjjjjjjj' + fkUnidade)
      // console.log('999999999999' +JSON.stringify(gti))

      if(gti?.id === fkUnidade){
        const txEmail1 = `
            <b>Nova Atividade para sua área.</b><br>

        Unidade: <strong>${setorSolicitante}</strong><br>
        Titulo: <strong>${titulo}</strong><br>
          Mensagem: <strong>${conteudo}</strong><br>
        <br/>
        <a href="https://www7.pe.senac.br/taskmanager/atividade/${atividadeSalva?.id}/edit">CLIQUE PARA VER.</a><p>  
        `
      //   let destinatario: string = ''

      // funcionarioDaArea.forEach((usuario, index) => {
      //   destinatario += `${usuario.email};`
      // })

      // console.log(`${destinatario}`)
        await emailUtils.enviar('marciohigo@pe.senac.br', txEmail1)
        await emailUtils.enviar('gracabezerra@pe.senac.br', txEmail1)
        await emailUtils.enviar('andrejar@pe.senac.br', txEmail1)
        // await emailUtils.enviar('marconunes@pe.senac.br', txEmail1)

        
        
      }else{
        const txEmail = `
        <b>Nova Atividade para sua área</b><br>

    Unidade: <strong>${setorSolicitante}</strong><br>
    Titulo: <strong>${titulo}</strong><br>
      Mensagem: <strong>${conteudo}</strong><br>
    <br/>
    <a href="https://www7.pe.senac.br/taskmanager/atividade/${atividadeSalva?.id}/edit">CLIQUE PARA VER</a><p>  
    `
    let destinatario: string = ''

      funcionarioDaArea.forEach((usuario, index) => {
        destinatario += `${usuario.email};`
      })

      console.log(`${destinatario}`)
      await emailUtils.enviar(destinatario, txEmail)

      }

      


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

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await Atividade.findOne({
        include: [
          { model: Area, include: [Unidade] },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          },
          Area,
          Classificacao,
          Status,
          Usuario
        ],
        where: { id }
      })

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

  async update (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      // console.log(id)
      const { fkStatus, arquivado, tempoEstimado } = req.body
      console.log(req.body.fkStatus)

      await Atividade.update(
        {
          fkStatus,
          arquivado,
          tempoEstimado
        },
        {
          where: {
            id
          },
          individualHooks: false
        }
      )

      // if (newStatus) {
      //   const status1 = status?.nome
      //   const txEmail = 'Atividade: \n' + titulo + ' \nStautus alterado para ' + status1;

      //   // emailUtils.enviar(email, txEmail)
      // }

      const registro = await Atividade.findOne({ where: { id } })
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

  async todasAsPendencias (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // const status = await queryInterface.sequelize.query('select id from status where nome = \'Aberto\'')
      const statusPendente = await Status.findOne({
        where: { nome: 'Pendente' }
      })
      const statusConcluido = await Status.findOne({
        where: { nome: 'Concluido' }
      })
      const statusCancelado = await Status.findOne({
        where: { nome: 'Cancelado' }
      })
      const statusParado = await Status.findOne({ where: { nome: 'Parado' } })
      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              statusPendente?.id,
              statusConcluido?.id,
              statusCancelado?.id,
              statusParado?.id
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

  async minhasAtividades (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const statusAberto = await Status.findOne({ where: { nome: 'Aberto' } })
      const statusIniciado = await Status.findOne({
        where: { nome: 'Iniciado' }
      })
      const statusPlanejado = await Status.findOne({
        where: { nome: 'Planejado para Iniciar' }
      })
      const statusPendente = await Status.findOne({
        where: { nome: 'Pendente' }
      })
      const statusParado = await Status.findOne({ where: { nome: 'Parado' } })

      const claImediata = await Classificacao.findOne({
        where: { nome: 'Execução Imediata' }
      })
      const claUrgente = await Classificacao.findOne({
        where: { nome: 'Urgente' }
      })
      const claImportente = await Classificacao.findOne({
        where: { nome: 'Importante' }
      })
      const claCircunstancial = await Classificacao.findOne({
        where: { nome: 'Circunstancial' }
      })

      const claNaoDef = await Classificacao.findOne({
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

      const registrosImediatos = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkClassificacao: claImediata?.id,
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              statusAberto?.id,
              statusIniciado?.id,
              statusPlanejado?.id,
              statusPendente?.id,
              statusParado?.id
            ]
          }
        }
      })

      const registrosUrgentes = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkClassificacao: claUrgente?.id,
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              statusAberto?.id,
              statusIniciado?.id,
              statusPlanejado?.id,
              statusPendente?.id,
              statusParado?.id
            ]
          }
        }
      })

      const registrosImportantes = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkClassificacao: claImportente?.id,
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              statusAberto?.id,
              statusIniciado?.id,
              statusPlanejado?.id,
              statusPendente?.id,
              statusParado?.id
            ]
          }
        }
      })

      const registroCircunstancial = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkClassificacao: claCircunstancial?.id,
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              statusAberto?.id,
              statusIniciado?.id,
              statusPlanejado?.id,
              statusPendente?.id,
              statusParado?.id
            ]
          }
        }
      })

      const registroNaoDefinidos = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkClassificacao: claNaoDef?.id,
          fkUsuarioExecutor: req.usuario.id,
          arquivado: false,
          fkStatus: {
            [Op.or]: [
              statusAberto?.id,
              statusIniciado?.id,
              statusPlanejado?.id,
              statusPendente?.id,
              statusParado?.id
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

  async minhasAtividadesArquivadas (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const statusConcluido = await Status.findOne({
        where: { nome: 'Concluido' }
      })
      const statusCancelado = await Status.findOne({
        where: { nome: 'Cancelado' }
      })

      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        where: {
          fkUsuarioExecutor: req.usuario.id,
          [Op.or]: [
            { arquivado: true },
            { fkStatus: statusConcluido?.id },
            { fkStatus: statusCancelado?.id }
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

  async recebidasSetor (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const area = await Area.findOne({ where: { id: req.usuario.fkArea } })

      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          '$Area.fkUnidade$': area?.fkUnidade,
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

  async recebidasSetorCount (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const area = await Area.findOne({ where: { id: req.usuario.fkArea } })

      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          '$Area.fkUnidade$': area?.fkUnidade,
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

  async solicitadasSetor (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const area = await Area.findOne({ where: { id: req.usuario.fkArea } })

      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          '$Usuario.fkArea$': area?.id

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

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
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

  async search (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query

      // const unidade = await Unidade.findOne({ where: { id: req.usuario.area.fkUnidade } });
      // const { Usuario } = req;
      // console.log(JSON.stringify(unidade))

      // console.log('pesquisa: ' + pesquisa);
      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
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

  async searchRecebidos (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { pesquisa } = req.query
      const area = await Area.findOne({ where: { id: req.usuario.fkArea } })

      console.log('pesquisa: ' + pesquisa)
      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          // fkArea: req.usuario.fkArea ,
          '$Area.fkUnidade$': area?.fkUnidade,

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

  async searchSolicitadas (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { pesquisa } = req.query
      const area = await Area.findOne({ where: { id: req.usuario.fkArea } })

      console.log('pesquisa: ' + pesquisa)
      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          // fkArea: req.usuario.fkArea ,
          // "$Area.fkUnidade$": area?.fkUnidade,
          fkStatus: pesquisa,

          [Op.or]: [{ '$Usuario.fkArea$': area?.id }]
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

  async naoatribuida (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // console.log(`${req.usuario.nome} - ${req.usuario.fkArea}`)
      const area = await Area.findOne({ where: { id: req.usuario.fkArea } })
      // console.log(req.usuario)
      let whereCustum = {
        pessoal: false,
        fkUsuarioExecutor: null,
        '$Area.fkUnidade$': area?.fkUnidade
      }

      if (req.usuario.Perfil.nome == PerfilUtils.Coordenador) {
        whereCustum = { ...whereCustum, '$Area.id$': area?.id }
      }

      const registros = await Atividade.findAll({
        include: [
          { model: Area, include: [Unidade] },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
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

  async atividadesRecebidas (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // const area = await Area.findOne({ where: { id: req.usuario.fkArea } });
      const status = await Status.findOne({ where: { nome: 'Aberto' } })

      const registros = await Atividade.findAll({
        include: [
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
          }
        ],
        order: [['createdAt', 'DESC']],
        where: {
          fkUsuarioExecutor: req.usuario.id,
          fkStatus: status?.id
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

  async chamadosAbertos (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const registros = await Atividade.findAll({
        include: [
          Classificacao,
          Status,
          {
            model: Usuario,
            foreignKey: 'fkUsuarioExecutor',
            as: 'UsuarioExecutor',
            include: [{ model: Area, include: [Unidade] }]
          },
          {
            model: Usuario,
            foreignKey: 'fkUsuarioSolicitante',

            include: [{ model: Area, include: [Unidade] }]
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
}

export default new AtividadeController()
