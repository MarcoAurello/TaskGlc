"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _questionariomodel = require('../model/questionario.model'); var _questionariomodel2 = _interopRequireDefault(_questionariomodel);
var _emailmodel = require('../model/email.model'); var _emailmodel2 = _interopRequireDefault(_emailmodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);


class QuestionarioController  {
    async all(req, res, next) {
        try {
            const registros = await _questionariomodel2.default.findAll({ order: [['nome', 'asc']] })

            res.status(200).json({ data: registros })
        } catch (err) {
            res.status(401).json({ message: err.errors[0].message })
        }
    }

    async create(req, res, next) {
        try {
            const {
                selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5
                , selectedValue6, selectedValue7, selectedValue8, fkUsuario,score

            } = req.body;


            //   const titulo = await Questionario.findOne({ where: { id: fkAtividade } });
            // const status = await Atividade.findOne({where: { id: fkAtividade } })
            // console.log(titulo?.fkStatus)

      

            await _questionariomodel2.default.create({
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

            const email = await _usuariomodel2.default.findOne({
                where: { id: fkUsuario },
              });


            await _emailmodel2.default.create({
            email: _optionalChain([email, 'optionalAccess', _ => _.email])
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

    async find(req, res, next) {
        throw new Error('Method not implemented.')
    }

    async update(req, res, next) {
        throw new Error('Method not implemented.')
    }

    async delete(req, res, next) {
        throw new Error('Method not implemented.')
    }

    async search(req, res, next) {
        throw new Error('Method not implemented.')
    }

    
}

exports. default = new QuestionarioController()
