import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Alex da Costa',
      email: 'alex.eduardo10@hotmail.com',
      password_hash: await hash('12345678', 6),
    })

    const { user } = await sut.execute({
      email: 'alex.eduardo10@hotmail.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'Alex da Costa',
      email: 'alex.eduardo10@hotmail.com',
      password_hash: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'alex.eduardo100@hotmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Alex da Costa',
      email: 'alex.eduardo10@hotmail.com',
      password_hash: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'alex.eduardo10@hotmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
