import { hash } from "bcryptjs"
import { prisma } from "src/lib/prisma"
import { UsersRepository } from "src/repositories/users-repository"

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {

  constructor(private usersRepository: UsersRepository) {
  }

  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('User already exists')
    }


    await this.usersRepository.create({ name, email, password_hash })
  }
}
