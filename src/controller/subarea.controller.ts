import { Request, Response, NextFunction } from "express";
import { IController } from "./controller.inteface";
import Area from "../model/area.model";
import SubArea from "../model/subarea.model";


class SubAreaController implements IController {
  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkArea } = req.query;

      if (fkArea) {
        const registros = await SubArea.findAll({
          where: { fkArea },

        });

        return res.status(200).json({ data: registros });
      } else {
        const registros = await SubArea.findAll();

        return res.status(200).json({ data: registros });
      }
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
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

export default new SubAreaController();
