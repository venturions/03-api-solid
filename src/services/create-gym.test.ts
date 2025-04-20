import { CreateGymService } from './create-gym'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.create({
      title: 'Academia',
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
