import { FastifyInstance } from 'fastify'

import verifyJWT from 'src/http/middlewares/verify-jwt'
import { metrics } from './metrics'
import { create } from './create'
import { history } from './history'
import { validate } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/metrics', metrics)
  app.get('/check-ins/history', history)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
