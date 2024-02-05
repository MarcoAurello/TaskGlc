import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Questionario from '../model/questionario.model'
import Email from '../model/email.model'
import Usuario from '../model/usuario.model'


class QuestionarioController implements IController {
    async all(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const registros = await Questionario.findAll({ order: [['nome', 'asc']] })

            res.status(200).json({ data: registros })
        } catch (err) {
            res.status(401).json({ message: err.errors[0].message })
        }
    }

    async create(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const {
                selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5
                , selectedValue6, selectedValue7, selectedValue8, fkUsuario,score

            } = req.body;


            //   const titulo = await Questionario.findOne({ where: { id: fkAtividade } });
            // const status = await Atividade.findOne({where: { id: fkAtividade } })
            // console.log(titulo?.fkStatus)

      

            await Questionario.create({
                pergunta1: selectedValue1,
                pergunta2: selectedValue2,
                pergunta3: selectedValue3,
                pergunta4: selectedValue4,
                pergunta5: selectedValue5,
                pergunta6: selectedValue6,
                pergunta7: selectedValue7,
                pergunta8: selectedValue8,
                score:score,
                fkUsuario:fkUsuario
            });

            const email = await Usuario.findOne({
                where: { id: fkUsuario },
              });


            await Email.create({
            email: email?.email
            });

            // await Email.update(
            //     {
            //         fkStatus: titulo?.fkStatus,
            //     },
            //     {
            //         where: {
            //             id: fkAtividade,
            //         },
            //     }
            // );
        
            res
                .status(200)
                .json({  message: "Seu feedback foi cadastrado, Obrigado." });
        } catch (err) {
            console.log(err)
            if (typeof err.errors[0].message === "undefined") {
                res.status(401).json({ message: JSON.stringify(err) });
            } else {
                res.status(401).json({ message: err.errors[0].message });
            }
        }
    }

    async find(req: Request, res: Response, next: NextFunction): Promise<any> {
        throw new Error('Method not implemented.')
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        throw new Error('Method not implemented.')
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        throw new Error('Method not implemented.')
    }

    async search(req: Request, res: Response, next: NextFunction): Promise<any> {
        throw new Error('Method not implemented.')
    }

    
}

export default new QuestionarioController()
