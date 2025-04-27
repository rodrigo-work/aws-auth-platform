import { Request, Response, Router } from 'express'
import { GroupController } from '../controllers/GroupController'

export class GroupRoutes {
  private router: Router
  private groupController: GroupController

  constructor() {
    this.router = Router()
    this.groupController = new GroupController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(
      '/status',
      async (req: Request, res: Response): Promise<void> => {
        await this.groupController.getStatus(req, res)
      }
    )

    this.router.post(
      '/create',
      this.groupController.create.bind(this.groupController)
    )
    this.router.get(
      '/list',
      this.groupController.list.bind(this.groupController)
    )
    this.router.post(
      '/update',
      this.groupController.update.bind(this.groupController)
    )
    this.router.post(
      '/delete',
      this.groupController.delete.bind(this.groupController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
