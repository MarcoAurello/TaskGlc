import { IController } from "./controller.inteface";
import { Request, Response, NextFunction } from "express";
import UsuarioAtividade from "../model/usuarioAtividade.model";
import Area from "../model/area.model";
import Atividade from "../model/atividade.model";
import Usuario from "../model/usuario.model";
import emailUtils from "../utils/email.utils";
// import emailUtils from '../utils/email.utils'
// import Chamado from '../models/chamado-model';

class UsuarioAtividadeController implements IController {
  async all(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const area = await Area.findOne({
        where: { id: req.usuario.fkArea },
      });
      const registros = await Usuario.findAll({
        include: [Area],
        where: {
          "$Area.fkUnidade$": area?.fkUnidade,
          // validado: true,
        },
      });

      res.status(200).json({ data: registros });
    } catch (err) {
      res.status(401).json({ data: null, mesage: err });
    }
  }

  async create(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkClassificacao, fkAtividade, fkUsuario, ativo } = req.body;
      const emailExecutor = await Usuario.findOne({ where: { id: fkUsuario } });

      const registro = await UsuarioAtividade.create({
        fkUsuario,
        fkAtividade,
        ativo,
      });

      await Atividade.update(
        {
          fkClassificacao: fkClassificacao,
          fkUsuarioExecutor: fkUsuario,
        },
        {
          where: { id: fkAtividade },
        }
      );

      const msg = `
      <b>Chegou atividade para você.<br>
      <a href="https://www7.pe.senac.br/taskmanager/atividade/${fkAtividade}/edit">CLIQUE PARA VER</a><p>
  `;

      emailUtils.enviar(emailExecutor?.email, msg);

      res
        .status(200)
        .json({
          data: registro,
          message: "Chamado enviado para o funcionario ",
        });
    } catch (err) {
      console.log(err);
      if (typeof err.errors[0].message === "undefined") {
        res.status(401).json({ message: JSON.stringify(err) });
      } else {
        res.status(401).json({ message: err.errors[0].message });
      }
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      const registro = await UsuarioAtividade.findOne({
        where: {
          id,
        },
      });

      res.status(200).json({ data: registro });
    } catch (err) {
      if (typeof err.errors[0].message === "undefined") {
        res.status(401).json({ message: JSON.stringify(err) });
      } else {
        res.status(401).json({ message: err.errors[0].message });
      }
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

export default new UsuarioAtividadeController();
