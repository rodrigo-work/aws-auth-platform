import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

export class AuthRoutes {
  private router: Router
  private authController: AuthController

  constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // this.router.get(
    //   '/status',
    //   async (req: Request, res: Response): Promise<void> => {
    //     await this.authController.statusAuth(req, res)
    //   }
    // )

    // this.router.post(
    //   '/sign-up',
    //   this.authController.signUp.bind(this.authController)
    // )
    // this.router.post(
    //   '/confirm',
    //   this.authController.confirmSignUp.bind(this.authController)
    // )
    this.router.post(
      '/sign-in',
      this.authController.signIn.bind(this.authController)
    )
    // this.router.post(
    //   '/forgot-password',
    //   this.authController.forgotPassword.bind(this.authController)
    // )
    // this.router.post(
    //   '/reset-password',
    //   this.authController.resetPassword.bind(this.authController)
    // )
    // this.router.post('/mfa', this.authController.mfa.bind(this.authController))
    // this.router.post(
    //   '/verify-mfa',
    //   this.authController.verifyMfa.bind(this.authController)
    // )
  }

  public getRouter(): Router {
    return this.router
  }
}
