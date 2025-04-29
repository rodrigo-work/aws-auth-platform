import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'
import { AbstractController } from './AbstractController'

export class AuthController extends AbstractController {
  private readonly cognitoService: AuthService

  constructor() {
    super()
    this.cognitoService = new AuthService()
  }

  // // Registrar um novo usuário
  // public async signUp(req: Request, res: Response): Promise<void> {
  //   const { email, password, firstName, lastName } = req.body

  //   try {
  //     await this.cognitoService.signUp(email, password, firstName, lastName)
  //     res.status(200).json({
  //       message: 'Usuário registrado. Verifique seu e-mail para confirmação.'
  //     })
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message })
  //   }
  // }

  // // Confirmar o registro do usuário
  // public async confirmSignUp(req: Request, res: Response): Promise<void> {
  //   const { email, confirmationCode } = req.body

  //   try {
  //     await this.cognitoService.confirmSignUp(email, confirmationCode)
  //     res.status(200).json({ message: 'Usuário confirmado com sucesso.' })
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message })
  //   }
  // }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const data = await this.cognitoService.signIn(email, password)
      res.status(200).json({ data: data.AuthenticationResult })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  // // Iniciar recuperação de senha
  // public async forgotPassword(req: Request, res: Response): Promise<void> {
  //   const { email } = req.body

  //   try {
  //     await this.cognitoService.forgotPassword(email)
  //     res.status(200).json({ message: 'E-mail de recuperação enviado.' })
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message })
  //   }
  // }

  // // Confirmar a nova senha após a recuperação
  // public async resetPassword(req: Request, res: Response): Promise<void> {
  //   const { email, confirmationCode, newPassword } = req.body

  //   try {
  //     await this.cognitoService.confirmPassword(
  //       email,
  //       confirmationCode,
  //       newPassword
  //     )
  //     res.status(200).json({ message: 'Senha alterada com sucesso.' })
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message })
  //   }
  // }

  // // Iniciar o processo de MFA
  // public async mfa(req: Request, res: Response): Promise<void> {
  //   const { email } = req.body

  //   try {
  //     await this.cognitoService.initiateMfa(email)
  //     res
  //       .status(200)
  //       .json({ message: 'MFA iniciado. Siga as instruções para configurar.' })
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message })
  //   }
  // }

  // // Verificar o código MFA
  // public async verifyMfa(req: Request, res: Response): Promise<void> {
  //   const { email, mfaCode } = req.body

  //   try {
  //     await this.cognitoService.verifyMfa(email, mfaCode)
  //     res.status(200).json({ message: 'MFA verificado com sucesso.' })
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message })
  //   }
  // }
}
