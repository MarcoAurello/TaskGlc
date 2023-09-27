import { Request, Response, NextFunction } from "express";
import Area from "../model/area.model";
import Perfil from "../model/perfil.model";
import Unidade from "../model/unidade.model";
import Usuario from "../model/usuario.model";
import { IController } from "./controller.inteface";

class UsuarioDemandadoController implements IController {
  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Usuario.findAll({});

      res.status(200).json({ data: registros });
    } catch (err) {
      if (typeof err.errors[0].message === "undefined") {
        res.status(401).json({ message: JSON.stringify(err) });
      } else {
        res.status(401).json({ message: err.errors[0].message });
      }
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error("Method not implemented.");
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

export default new UsuarioDemandadoController();
