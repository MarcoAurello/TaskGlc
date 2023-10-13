/* eslint-disable n/handle-callback-err */
import { Request, Response, NextFunction } from 'express'
import ActivityDirectory from 'activedirectory'
import Usuario from '../model/usuario.model'
import ConfiguracaoGlobal from '../model/configuracaoGeral.model'
import bcrypt from 'bcrypt'

class AuthenticationController {
  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body

      const configuracao = await ConfiguracaoGlobal.findOne()

      const config = {
        url: configuracao?.urlAd,
        baseDN: configuracao?.baseDN,
        username: configuracao?.usernameAd,
        password: configuracao?.passwordAd
      }

      const ad = new ActivityDirectory(config)

      if (!email) {
        return res.status(401).json({ message: 'O campo e-mail deve ser preenchido corretamente.' })
      }

      if (!password) {
        return res.status(401).json({ message: 'O campo senha deve ser preenchido corretamente.' })
      }

      if (configuracao?.autenticacaoAd) {
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
      } else {
        const registro = await Usuario.findOne({ where: { email, ativo: true } })

        if (!registro) {
          return res.status(401).json({ message: 'Não foi possível localizar o usuário.' })
        }

        if (!await bcrypt.compare(password, registro.passwordHash)) {
          return res.status(401).json({ message: 'Senha inválida.' })
        }
        

        return res.status(200).json({ message: 'Usuário validado com sucesso.', token: registro.generateToken() })
      }
    } catch (err) {
      console.log(err);
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message });
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message });
      }

      res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' });
    }
  }

  async logged (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      res.status(200).json({ data: req.usuario })
    } catch (err) {
      console.log(err);
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message });
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message });
      }

      res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' });
    }
  }
}

export default new AuthenticationController()
