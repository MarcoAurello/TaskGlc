/* eslint-disable n/handle-callback-err */
import { Request, Response, NextFunction } from 'express'
import ActivityDirectory from 'activedirectory'
import Usuario from '../model/usuario.model'

class AuthenticationController {
  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body

      const config = {
        url: 'ldap://10.9.8.16',
        baseDN: 'drpe',
        username: 'diegoalisson@pe.senac.br',
        password: 'gti@2021'
      }

      const ad = new ActivityDirectory(config)

      if (!email) {
        return res.status(401).json({ message: 'O campo e-mail deve ser preenchido corretamente.' })
      }

      if (!password) {
        return res.status(401).json({ message: 'O campo senha deve ser preenchido corretamente.' })
      }

      ad.authenticate(`${email}`, password, async (err, auth) => {
        if (err) {
          return res.status(401).json({ message: 'Login ou senha inválidos.' })
        }

        if (auth) {
          let usuario = await Usuario.findOne({ where: { email } })
          if (!usuario) {
            await Usuario.create({
              email,
              password
            })
          }

          usuario = await Usuario.findOne({ where: { email } })
          return res.status(200).json({ message: 'Usuário validado com sucesso.', token: usuario?.generateToken() })
        }
      })
    } catch (err) {
      res.status(400).json({ message: 'Login ou senha inválidos.' })
    }
  }
}

export default new AuthenticationController()
