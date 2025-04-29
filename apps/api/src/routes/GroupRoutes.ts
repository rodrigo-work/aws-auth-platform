import { Router } from 'express'
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
    this.router.post(
      '/',
      this.groupController.createGroup.bind(this.groupController)
    )

    this.router.get(
      '/',
      this.groupController.getAllGroup.bind(this.groupController)
    )

    this.router.delete(
      '/',
      this.groupController.deleteGroup.bind(this.groupController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
