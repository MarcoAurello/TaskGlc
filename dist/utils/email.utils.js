"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* eslint-disable promise/param-names */
var _configuracaoGeralmodel = require('../model/configuracaoGeral.model'); var _configuracaoGeralmodel2 = _interopRequireDefault(_configuracaoGeralmodel);

const nodemailer = require('nodemailer')

class Email {
  async enviar (email, mensagem) {
    const configuracao = await _configuracaoGeralmodel2.default.findOne()

    return new Promise((resolved, rejected) => {
      try {
        const transportador = nodemailer.createTransport({
          host: _optionalChain([configuracao, 'optionalAccess', _ => _.host]),
          secureConnection: _optionalChain([configuracao, 'optionalAccess', _2 => _2.ssl]),
          port: _optionalChain([configuracao, 'optionalAccess', _3 => _3.porta]),
          auth: {
            user: _optionalChain([configuracao, 'optionalAccess', _4 => _4.email]),
            pass: _optionalChain([configuracao, 'optionalAccess', _5 => _5.password])
          },

        // const transportador = nodemailer.createTransport({
        //   host: "sandbox.smtp.mailtrap.io",
        //   port: 2525,
        //   auth: {
        //     user: "268e6b2a3eb0f1",
        //     pass: "9f6b2bb6354591"
        //   }
        // });
          tls: { ciphers: 'SSLv3' }
        })

      

        const textHtml = _optionalChain([configuracao, 'optionalAccess', _6 => _6.template, 'access', _7 => _7.replace, 'call', _8 => _8('@EmailBody', mensagem)])

        const opcoesEmail = {
          from: _optionalChain([configuracao, 'optionalAccess', _9 => _9.email]),
          to: email,
          subject: 'SENAC-PE - Sistema de Atividades',
          html: textHtml
        }

        transportador.sendMail(opcoesEmail, (error, info) => {
          if (error) {
            rejected(error)
          } else {
            resolved('Email enviado com sucesso')
          }
        })
      } catch (err) {
        rejected(err)
      }
    })
  }
}

exports. default = new Email()
