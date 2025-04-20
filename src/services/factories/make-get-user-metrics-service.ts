import { PrismaCheckInsRepository } from 'src/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsService } from '../get-user-metrics'

export function makeGetUserMetricsProfileUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsService(checkInsRepository)

  return service
}
