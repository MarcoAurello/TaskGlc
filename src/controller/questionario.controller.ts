import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Questionario from '../model/questionario.model'
import Email from '../model/email.model'
import Usuario from '../model/usuario.model'
import conexao from '../model/connection'
import { QueryTypes } from 'sequelize'


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

export default new QuestionarioController()
