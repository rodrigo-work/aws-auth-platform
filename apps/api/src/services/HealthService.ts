export class HealthService {
  public async getStatus(): Promise<string> {
    return 'ok'
  }
}
