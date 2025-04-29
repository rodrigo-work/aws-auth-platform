import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export class UserRoutes {
  private router: Router
  private userController: UserController

  constructor() {
    this.router = Router()
    this.userController = new UserController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      this.userController.getAllUser.bind(this.userController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
