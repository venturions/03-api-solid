import fastify from 'fastify'
import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient()

export const app = fastify()

prisma.user.create({
  data: {
    name: 'Alex da Costa',
    email: 'alex.eduardo10@hotmail.com',
  },
})
