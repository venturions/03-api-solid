export class LateCheckInValidationError extends Error {
  constructor() {
    super('You can only check in until 20 minutes after the gym opens.')
  }
}
