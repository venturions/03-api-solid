import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'src/app'
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Javascript',
        description: 'Javascript description',
        phone: '1234567890',
        latitude: -23.5505,
        longitude: -46.6333,
      })

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Typescript',
        description: 'Typescript description',
        phone: '1234567891',
        latitude: -23.5504,
        longitude: -46.6334,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        query: 'Javascript',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript',
        description: 'Javascript description',
        phone: '1234567890',
      }),
    ])
  })
})
