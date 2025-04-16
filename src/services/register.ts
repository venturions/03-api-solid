import { hash } from "bcryptjs"
import { prisma } from "src/lib/prisma"
import { PrismaUsersRepository } from "src/repositories/prisma-users-repository"

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export async function registerService({ name, email, password }: RegisterServiceRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if (userWithSameEmail) {
    throw new Error('User already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({ name, email, password_hash })
}