import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

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
