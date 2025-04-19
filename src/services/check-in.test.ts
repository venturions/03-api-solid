import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './checkIn'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckIn service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
