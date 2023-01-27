import request from 'supertest'
import app from '../../src/server'

describe('router.middleware', () => {
  it('deve retornar uma mensagem de error, quando não for informado um token valido.', async () => {
    const response = await request(app).get('/api/usuario/')
      .send()

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token not provided.')
  })
})
