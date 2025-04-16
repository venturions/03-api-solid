import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'
import { registerService } from 'src/services/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerService({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      return reply.status(409).send({
        message: 'User already exists',
      })
    }

    return reply.status(500).send({
      message: 'Internal server error',
    })
  }


  return reply.status(201).send()
}
