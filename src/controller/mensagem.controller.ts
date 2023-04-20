import { Request, Response, NextFunction } from "express";
import Atividade from "../model/atividade.model";
import Mensagem from "../model/mensagem.model";
import Status from "../model/status.model";
import Usuario from "../model/usuario.model";
import emailUtils from "../utils/email.utils";
import { IController } from "./controller.inteface";
import Arquivo from "../model/arquivo.model";

class MensagemController implements IController {
  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkAtividade } = req.query;

      const registros = await Mensagem.findAll({
        where: { fkAtividade },
        include: [Usuario],
        order: [["createdAt", "desc"]],
      });

      res.status(200).json({ data: registros });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }

  async create(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        fkAtividade,
        conteudo,
        email,
        emailExecutor,
        caminho,
        listaDeArquivosEnviados,
      } = req.body;
      const titulo = await Atividade.findOne({ where: { id: fkAtividade } });
      // const status = await Atividade.findOne({where: { id: fkAtividade } })
      // console.log(titulo?.fkStatus)
      await Mensagem.create({
        fkAtividade,
        conteudo,
        fkUsuario: req.usuario.id,
      });

      await Atividade.update(
        {
          fkStatus: titulo?.fkStatus,
        },
        {
          where: {
            id: fkAtividade,
          },
        }
      );
      if (caminho ) {
        await Atividade.update(
          {
            caminho: caminho,
          },
          {
            where: {
              id: fkAtividade,
            },
          }
        );

        const atividadeSalva = await Atividade.findOne({
          where: { titulo: titulo?.titulo },
        });

        listaDeArquivosEnviados.map((item) => {
          Arquivo.update(
            {
              fkAtividade: atividadeSalva?.id,
            },
            {
              where: { id: item.id },
            }
          );
        });
      }

      const txEmail =
        "Atividade: " + titulo?.titulo + ".\n tem nova interação! " + conteudo;

      emailUtils.enviar(email, txEmail);

      if (emailExecutor) {
        emailUtils.enviar(
          emailExecutor,
          "Atividade: \n" +
            titulo?.titulo +
            ". \n recebeu uma nova mensagem! " +
            conteudo
        );
      }

      const atividade = await Atividade.findOne({ where: { id: fkAtividade } });

      res
        .status(200)
        .json({ data: atividade, message: "Cadastro realizado com sucesso." });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }

  async mensagemPrimeira(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { fkAtividade } = req.query;

      const registros = await Mensagem.findAll({
        where: { fkAtividade: fkAtividade },
      });

      res.status(200).json({ data: registros });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkAtividade } = req.query;

      const registros = await Mensagem.findAll({
        where: { fkAtividade: fkAtividade },
      });

      res.status(200).json({ data: registros });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async search(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default new MensagemController();
