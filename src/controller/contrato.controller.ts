import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Contrato from '../model/contrato.model'
import Unidade from '../model/unidade.model'

class ContratoController implements IController {
    async all (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
          const { fkUnidade } = req.query
          
    
          if (fkUnidade) {
            const registros = await Contrato.findAll({
            //   where: { fkUnidade },
              // include: [Unidade],
            //   order: [['nome', 'asc']]
            })
    
            return res.status(200).json({ data: registros })
          } else {
            const registros = await Contrato.findAll({
              include: [Unidade],
              // order: [['nome', 'asc']]
            })

         
    
            return res.status(200).json({ data: registros })
          }
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

      async setor (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
          const { fkUnidade } = req.query
          console.log('pipi'+JSON.stringify(req))
          
    
         
            const registros = await Contrato.findAll({
            
                where: {
                  fkUnidade: req.usuario.area.unidade.id
                }
              
              // order: [['nome', 'asc']]
            })
         
    
            return res.status(200).json({ data: registros })
          
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


      async create (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
          const {
            newSetor,
            nomeEmpresa,
            descricaoEmpresa,
            parcelasEmpresa,
            valorContrato,
            inicioVigencia,
            finalVigencia

          } = req.body
    
          const registro = await Contrato.create({
            nomeEmpresa,
            descricao : descricaoEmpresa,
            parcelas:parcelasEmpresa,
            inicioVigencia,
            finalVigencia,
            fkUnidade: newSetor,
            valorContrato

          })
    
          res.status(200).json({ data: registro, message: 'Cadastro realizado com sucesso.' })
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
    
          const registro = await Contrato.findOne({
            include: [ Unidade]
            ,
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
    throw new Error('Method not implemented.')
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkUnidade } = req.query
      console.log('pipi'+JSON.stringify(req))
      

     
        const registros = await Contrato.findAll({
        
            where: {
              fkUnidade: req.usuario.area.unidade.id
            }
          
          // order: [['nome', 'asc']]
        })
     

        return res.status(200).json({ data: registros })
      
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

export default new ContratoController()
