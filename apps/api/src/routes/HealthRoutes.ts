import { Request, Response, Router } from 'express'
import { HealthController } from '../controllers/HealthController'

export class HealthRoutes {
  private router: Router
  private healthController: HealthController

  constructor() {
    this.router = Router()
    this.healthController = new HealthController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(
      '/health',
      async (req: Request, res: Response): Promise<void> => {
        await this.healthController.getStatus(req, res)
      }
    )
    this.router.get(
      '/message/:name',
      async (req: Request, res: Response): Promise<void> => {
        await this.healthController.getMessage(req, res)
      }
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
