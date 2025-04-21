import { FastifyInstance } from 'fastify'

import verifyJWT from 'src/http/middlewares/verify-jwt'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
