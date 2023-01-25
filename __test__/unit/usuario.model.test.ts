/*  */
import Usuario from '../../src/model/usuario.model'

describe('usuario.model', () => {
  beforeAll(async () => {
    await Usuario.destroy({ truncate: true })
  })

  it('deve receber um usuário com o campo nome Empty | Null e retornar uma exceção.', async () => {
    const params = {
      nome: '',
      email: 'diegoalisson@pe.senac.br'
    }

    let response = ''

    await Usuario.create(params)
      .catch(err => {
        response = err.errors[0].message
      })

    expect(response).toBe('O campo nome deve ser preenchido corretamente.')
  })

  it('deve receber um usuário com o campo email Empty | Null e retornar uma exceção.', async () => {
    const params = {
      nome: 'Diego Alisson',
      email: ''
    }

    let response = ''

    await Usuario.create(params)
      .catch(err => {
        response = err.errors[0].message
      })

    expect(response).toBe('O campo email deve ser preenchido corretamente.')
  })

  it('deve receber um usuário com as informações corretas e retornar um UUID.', async () => {
    const params = {
      nome: 'Diego Alisson',
      email: 'diegoalisson@pe.senac.br'
    }

    const response = await Usuario.create(params)
      .catch(err => console.log(err))
    console.log(response)

    expect(response).toHaveProperty('id')
  })
})
