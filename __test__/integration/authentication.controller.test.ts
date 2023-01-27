import app from '../../src/server'
import request from 'supertest'
import Usuario from '../../src/model/usuario.model'

describe('authentication.controller', () => {
  it('deve levantar uma exceção quando campo email for Null | Empty', async () => {
    const response = await request(app)
      .post('/api/authentication/')
      .send({ email: '', password: '123456789' })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('O campo e-mail deve ser preenchido corretamente.')
  })

  it('deve levantar uma exceção quando campo password for Null | Empty', async () => {
    const response = await request(app)
      .post('/api/authentication/')
      .send({ email: 'diegoalisson@pe.senac.br', password: '' })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('O campo senha deve ser preenchido corretamente.')
  })

  it('deve levantar uma exceção quando o login ou senha forem inválidados pelo ActivityDirectory', async () => {
    const response = await request(app)
      .post('/api/authentication/')
      .send({ email: 'diegoalisson@pe.senac.br', password: '123456789' })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Login ou senha inválidos.')
  })

  it('deve retornar uma mensagem de sucesso quando o usuário for validado por o ActivityDirectory', async () => {
    const response = await request(app)
      .post('/api/authentication/')
      .send({ email: 'diegoalisson@pe.senac.br', password: 'gti@2021' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Usuário validado com sucesso.')
  })

  it('deverá criar um novo usuário quando for o primeiro acesso de autenticação via ActivityDirectory', async () => {
    const response = await request(app)
      .post('/api/authentication/')
      .send({ email: 'diegoalisson@pe.senac.br', password: 'gti@2021' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Usuário validado com sucesso.')

    const registro = await Usuario.findOne({ where: { email: 'diegoalisson@pe.senac.br' } })
    expect(registro).toHaveProperty('id')
    expect(registro?.id.length).toBeGreaterThanOrEqual(36)
  })

  it('deve retornar um JWT Token quando o usuário for validado por o ActivityDirectory', async () => {
    const response = await request(app)
      .post('/api/authentication/')
      .send({ email: 'diegoalisson@pe.senac.br', password: 'gti@2021' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Usuário validado com sucesso.')
    expect(response.body).toHaveProperty('token')
    expect(response.body.token.length).toBeGreaterThanOrEqual(60)
  })
})
