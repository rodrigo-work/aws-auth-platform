import { Request, Response } from 'express'
import { HealthService } from '../services/HealthService'
import { AbstractController } from './AbstractController'

export class HealthController extends AbstractController {
  private readonly healthService: HealthService

  constructor() {
    super()
    this.healthService = new HealthService()
  }

  public async getStatus(_: Request, res: Response): Promise<void> {
    try {
      const status: string = await this.healthService.getStatus()
      this.handleResponse(res, { status })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  public async getMessage(req: Request, res: Response): Promise<void> {
    res.json({ message: `hello ${req.params.name}` })
  }
}
