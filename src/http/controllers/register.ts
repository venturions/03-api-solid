import { RegisterService } from 'src/services/register';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {

    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.execute({
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
