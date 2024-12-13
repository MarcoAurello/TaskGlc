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
const { uuid } = require('uuidv4')
import conexao from '../model/connection'
const cron = require('node-cron');

// import UsuarioAtividade from "../model/usuarioAtividade.model";
import Unidade from '../model/unidade.model'
import PerfilUtils from '../utils/perfil.utils'
import emailUtils from '../utils/email.utils'
import { QueryTypes } from 'sequelize'
import TimeLineStatus from '../model/timeLineStatus.model'
const multer = require('multer')
const { Op } = require('sequelize')


const buscarAtividadesPendentes = async () => {
  try {
    const status = await Status.findOne({ where: { nome: 'pendente' } });
    if (status) {
      const atividadesPendentes = await Atividade.findAll({
        where: { fkStatus: status?.id },
        include: [
          { model: Usuario }
        ]
      });

      for (const atividade of atividadesPendentes) {
        let email = atividade.Usuario.email;
        const txEmail1 = `
            <b>Cadastro pendente de edição.</b><br>

        Item: <strong>${atividade?.titulo}</strong><br>
        Faça os ajustes para a GLC proseguir com o processo 
        <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${atividade?.id}/edit">CLIQUE PARA VER.</a><p> 
        `

        await emailUtils.enviar(email, txEmail1)


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



class AtividadeController implements IController {
  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(req: any, res: Response, next: NextFunction): Promise<any> {
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
      const area = await Area.findOne({
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


      const classificacao = await Classificacao.findOne({
        where: { nome: 'Não Definido' }
      })

      const status = await Status.findOne({
        where: { nome: 'Aberto' }
      })

      const proc = protocolo()

      if (cnpj && razaoSocial) {

        const atividade = await Atividade.create({
          id: uuid(),
          titulo,
          fkClassificacao: classificacao?.id,
          protocolo: proc,
          fkArea: area?.id,
          cnpj,
          razao: razaoSocial,
          email: emailEmpresa,
          gPagamento,
          filial,
          gCotacao,
          fone: telefoneEmpresa,
          detalhes: conteudo,
          fkStatus: status?.id,
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho
        })

        await Mensagem.create({
          conteudo,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })



      } else {

        const atividade = await Atividade.create({
          titulo,
          forma,
          material,
          cor,
          fkClassificacao: classificacao?.id,
          protocolo: proc,
          fkArea: area?.id,
          medida,
          centroCusto,
          indicacao,
          detalhes: conteudo,
          informacoes,
          eletro,
          dimensao,
          fkStatus: status?.id,
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho
        })

        await Mensagem.create({
          conteudo,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })

      }

      // const emailCoordenadores = await queryInterface.sequelize.query('select email from usuario where fkArea = \'Aberto\'')
      // const status = await queryInterface.sequelize.query('select id from status where nome = \'Aberto\'')


      const atividadeSalva = await Atividade.findOne({
        where: {
          titulo,
          protocolo: proc
        }
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



      await TimeLineStatus.create(
        {
          fkStatus: status?.id,
          fkAtividade: atividadeSalva?.id,
          fkUsuario: req.usuario.id
        }
      )







      const glc = await Unidade.findOne({
        where: { nome: 'GLC' }
      })



      const txEmail1 = `
            <b>Nova Atividade para sua área.</b><br>

        Unidade: <strong>${setorSolicitante}</strong><br>
        Titulo: <strong>${titulo}</strong><br>
          Mensagem: <strong>${conteudo}</strong><br>
        <br/>
        <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${atividadeSalva?.id}/edit">CLIQUE PARA VER.</a><p>  
        `
      let destinatarios = '';

      funcionarioDaArea.forEach((usuario, index) => {
        destinatarios += `${usuario.email};`;
      });

      emailUtils.enviar(destinatarios, txEmail1);





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

  async createProjeto(req: any, res: Response, next: NextFunction): Promise<any> {
    try {

      const {
        hash,
        fkUnidade,
        fkArea,
        titulo,
        conteudo,
        categoria,
        caminho,
        tipoCadastro,

        nomeProjeto,
        qtdItems,
        dataInicio,
        listaDeArquivosEnviados,
        setorSolicitante
      } = req.body
      console.log("axxxxxfffffffx" + req.body);


      // console.log('pop');

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }


      const area = await Area.findOne({
        where: { nome: "GLC-Cadastro de Item" }
      })


      // if (!titulo) {
      //   return res.status(401).json({
      //     message: 'O campo título deve ser preenchido corretamente.'
      //   })
      // }

      if (!nomeProjeto) {
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

      const proc = protocolo()

      if (nomeProjeto) {

        const atividade = await Atividade.create({
          id: uuid(),
          titulo: 'Cadastro de Projeto até 10 itens',
          fkClassificacao: classificacao?.id,
          protocolo: proc,
          fkArea: area?.id,
          prazoInicioAtividades: dataInicio,


          detalhes: nomeProjeto,
          qtdItems,

          fkStatus: status?.id,
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho,
          nomeProjeto,
          qtdPlanilha: qtdItems,
        })

        await Mensagem.create({
          conteudo: nomeProjeto,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })

        const atividadeSalva = await Atividade.findOne({
          where: { 
          protocolo: proc 
        }
        })

        if (hash) {
          await Arquivo.update(
            {
              fkAtividade: atividadeSalva?.id
            },
            {
              where: { hash }
            }
          )
        }



      }

      const atividadeSalva = await Atividade.findOne({
        where: {
          titulo,
          protocolo: proc
        }
      })

      // listaDeArquivosEnviados.map((item) => {
      //   Arquivo.update(
      //     {
      //       fkAtividade: atividadeSalva?.id
      //     },
      //     {
      //       where: { id: item.id }
      //     }
      //   )
      // })

      const funcionarioDaArea = await Usuario.findAll({
        where: { fkArea }
      })



      // await TimeLineStatus.create(
      //   {
      //     fkStatus: status?.id,
      //     fkAtividade: atividadeSalva?.id,
      //     fkUsuario: req.usuario.id
      //   }
      // )







      // const glc = await Unidade.findOne({
      //   where: { nome :'GLC' }
      // })



      // const txEmail1 = `
      //     <b>Nova Atividade para sua área.</b><br>

      // Unidade: <strong>${setorSolicitante}</strong><br>
      // Titulo: <strong>${titulo}</strong><br>
      //   Mensagem: <strong>${conteudo}</strong><br>
      // <br/>
      // <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${atividadeSalva?.id}/edit">CLIQUE PARA VER.</a><p>  
      // `
      // let destinatarios = '';

      // funcionarioDaArea.forEach((usuario, index) => {
      //   destinatarios += `${usuario.email};`;
      // });

      //  emailUtils.enviar(destinatarios, txEmail1);





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

  



  async createMr(req: any, res: Response, next: NextFunction): Promise<any> {
    try {

      const {
        hash,
        fkUnidade,
        fkArea,
        parametrizacao,
        titulo,
        conteudo,
        categoria,
        caminho,
        tipoCadastro,
        anoMr,
        segmentoMr,

        nomeProjeto,
        qtdItems,
        dataInicio,
        listaDeArquivosEnviados,
        setorSolicitante
      } = req.body
      console.log("axxxxxfffffffx" + req.body);


      // console.log('pop');

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }


      const area = await Area.findOne({
        where: { nome: "GLC-Cadastro de Item" }
      })


      // if (!titulo) {
      //   return res.status(401).json({
      //     message: 'O campo título deve ser preenchido corretamente.'
      //   })
      // }

      // if (!anoMr) {
      //   return res.status(401).json({
      //     message: 'O campo Ano MR deve ser preenchido corretamente.'
      //   })
      // }


      const classificacao = await Classificacao.findOne({
        where: { nome: 'Não Definido' }
      })

      const status = await Status.findOne({
        where: { nome: 'Aberto' }
      })

      const proc = protocolo()

      console.log('anoMr', anoMr)
      if (anoMr) {

        const atividade = await Atividade.create({
          id: uuid(),
          titulo: 'Cadastro de MR a partir de 30 itens',
          fkClassificacao: classificacao?.id,
          protocolo: proc,
          fkArea: area?.id,
          prazoInicioAtividades: dataInicio,
          conteudo:'Cadastro de MR a partir de 30 itens',
        
          anoMr: anoMr,
          segmentoMr: segmentoMr,
          

          fkStatus: status?.id,
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho,
        
        })

        await Mensagem.create({
          conteudo: segmentoMr,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })

        const atividadeSalva = await Atividade.findOne({
          where: { 
          protocolo: proc 
        }
        })

        if (hash) {
          await Arquivo.update(
            {
              fkAtividade: atividadeSalva?.id
            },
            {
              where: { hash }
            }
          )
        }



      }

     

      const atividadeSalva = await Atividade.findOne({
        where: {
        
          protocolo: proc
        }
      })

      // listaDeArquivosEnviados.map((item) => {
      //   Arquivo.update(
      //     {
      //       fkAtividade: atividadeSalva?.id
      //     },
      //     {
      //       where: { id: item.id }
      //     }
      //   )
      // })

      if(atividadeSalva){

        await TimeLineStatus.create(
          {
            fkStatus: status?.id,
            fkAtividade: atividadeSalva?.id,
            fkUsuario: req.usuario.id
          }
        )
      }

    









      // const glc = await Unidade.findOne({
      //   where: { nome :'GLC' }
      // })



      // const txEmail1 = `
      //     <b>Nova Atividade para sua área.</b><br>

      // Unidade: <strong>${setorSolicitante}</strong><br>
      // Titulo: <strong>${titulo}</strong><br>
      //   Mensagem: <strong>${conteudo}</strong><br>
      // <br/>
      // <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${atividadeSalva?.id}/edit">CLIQUE PARA VER.</a><p>  
      // `
      // let destinatarios = '';

      // funcionarioDaArea.forEach((usuario, index) => {
      //   destinatarios += `${usuario.email};`;
      // });

      //  emailUtils.enviar(destinatarios, txEmail1);





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

  async createAjuste(req: any, res: Response, next: NextFunction): Promise<any> {
    try {

      const {
        hash,
        fkUnidade,
        fkArea,
        parametrizacao,
        titulo,
        conteudo,
        categoria,
        caminho,
        tipoCadastro,
        anoMr,
        segmentoMr,

        nomeProjeto,
        qtdItems,
        dataInicio,
        listaDeArquivosEnviados,
        setorSolicitante
      } = req.body
      console.log("axxxxxfffffffx" + req.body);


      // console.log('pop');

      if (!fkUnidade) {
        return res.status(401).json({
          message: 'O campo unidade deve ser preenchido corretamente.'
        })
      }


      const area = await Area.findOne({
        where: { nome: "GLC-Cadastro de Item" }
      })


      // if (!titulo) {
      //   return res.status(401).json({
      //     message: 'O campo título deve ser preenchido corretamente.'
      //   })
      // }

      // if (!anoMr) {
      //   return res.status(401).json({
      //     message: 'O campo Ano MR deve ser preenchido corretamente.'
      //   })
      // }


      const classificacao = await Classificacao.findOne({
        where: { nome: 'Não Definido' }
      })

      const status = await Status.findOne({
        where: { nome: 'Aberto' }
      })

      const proc = protocolo()

    

      if(parametrizacao){

        const atividade = await Atividade.create({
          titulo: 'Ajuste ou parametrização de cadastro',
          fkClassificacao: classificacao?.id,
          protocolo: proc,
          fkArea: area?.id,
         
          conteudo:parametrizacao,
          parametrizacaoCadastro:parametrizacao,
          
        
          

          fkStatus: status?.id,
          fkUsuarioSolicitante: req.usuario.id,
          arquivado: false,
          pessoal: false,
          // fkUsuarioExecutor,
          categoria: tipoCadastro,
          caminho,
        
        })

        await Mensagem.create({
          conteudo: parametrizacao,
          fkAtividade: atividade.id,
          fkUsuario: req.usuario.id
        })

        const atividadeSalva = await Atividade.findOne({
          where: { 
          protocolo: proc 
        }
        })

        if (hash) {
          await Arquivo.update(
            {
              fkAtividade: atividadeSalva?.id
            },
            {
              where: { hash }
            }
          )
        }

      }

      const atividadeSalva = await Atividade.findOne({
        where: {
        
          protocolo: proc
        }
      })

      // listaDeArquivosEnviados.map((item) => {
      //   Arquivo.update(
      //     {
      //       fkAtividade: atividadeSalva?.id
      //     },
      //     {
      //       where: { id: item.id }
      //     }
      //   )
      // })

      if(atividadeSalva){

        await TimeLineStatus.create(
          {
            fkStatus: status?.id,
            fkAtividade: atividadeSalva?.id,
            fkUsuario: req.usuario.id
          }
        )
      }

    









      // const glc = await Unidade.findOne({
      //   where: { nome :'GLC' }
      // })



      // const txEmail1 = `
      //     <b>Nova Atividade para sua área.</b><br>

      // Unidade: <strong>${setorSolicitante}</strong><br>
      // Titulo: <strong>${titulo}</strong><br>
      //   Mensagem: <strong>${conteudo}</strong><br>
      // <br/>
      // <a href="https://app1.pe.senac.br/taskmanagerglc/atividade/${atividadeSalva?.id}/edit">CLIQUE PARA VER.</a><p>  
      // `
      // let destinatarios = '';

      // funcionarioDaArea.forEach((usuario, index) => {
      //   destinatarios += `${usuario.email};`;
      // });

      //  emailUtils.enviar(destinatarios, txEmail1);





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


  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
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

      console.log('ppppppp', registro)

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

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
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



      await Atividade.update(
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

        await TimeLineStatus.create(
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

  async todasAsPendencias(
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

  async minhasAtividades(
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

  async minhasAtividadesArquivadas(
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

  async recebidasSetor(
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

  async recebidasSetorCount(
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

  async solicitadasSetor(
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

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
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

  async search(req: any, res: Response, next: NextFunction): Promise<any> {
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

  async searchRecebidos(
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

  async searchSolicitadas(
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

  async naoatribuida(
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

  async atividadesRecebidas(
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

  async chamadosAbertos(
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

  async termo(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { cpfTermo } = req.params; // Agora você está acessando os parâmetros da URL

      console.log(cpfTermo);

      const sql = `
      SELECT cpf
      FROM TermoAceite.dbo.Colaborador C
      INNER JOIN TermoAceite.dbo.Timeline TL ON C.ID = TL.idColaborador
      WHERE TL.idStatusTimeline = '3' AND CPF = '${cpfTermo}'
    `;


      const registro = await conexao.query(sql, { type: QueryTypes.SELECT });


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

export default new AtividadeController()
