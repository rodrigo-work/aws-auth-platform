export abstract class AbstractService {
  protected readonly userPoolId: string

  constructor() {
    this.userPoolId = process.env.COGNITO_USER_POOL_ID!
  }
}
