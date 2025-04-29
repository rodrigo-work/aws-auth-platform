import {
  AdminInitiateAuthCommand,
  AuthFlowType
} from '@aws-sdk/client-cognito-identity-provider'
import crypto from 'crypto'
import { AbstractService } from './AbstractService'

export class AuthService extends AbstractService {
  constructor() {
    super()
  }

  // public async signUp(
  //   email: string,
  //   password: string,
  //   firstName: string,
  //   lastName: string
  // ) {
  //   const params = {
  //     ClientId: this.clientId,
  //     Username: email,
  //     Password: password,
  //     UserAttributes: [
  //       { Name: 'name', Value: firstName ?? '' },
  //       { Name: 'family_name', Value: lastName ?? '' }
  //     ]
  //   }

  //   const command = new SignUpCommand(params)

  //   try {
  //     return await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`${(error as Error).message}`)
  //   }
  // }

  // // Confirmar o registro do usuário
  // public async confirmSignUp(email: string, confirmationCode: string) {
  //   const params = {
  //     Username: email,
  //     ConfirmationCode: confirmationCode,
  //     ClientId: this.clientId,
  //     UserPoolId: process.env.COGNITO_USER_POOL_ID!
  //   }

  //   const command = new AdminConfirmSignUpCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(
  //       `Erro ao confirmar o registro: ${(error as Error).message}`
  //     )
  //   }
  // }

  private generateSecretHash(
    username: string,
    clientId: string,
    clientSecret: string
  ): string {
    const hmac = crypto.createHmac('sha256', clientSecret)
    hmac.update(username + clientId)
    return hmac.digest('base64')
  }

  async signIn(email: string, password: string) {
    const secretHash = this.generateSecretHash(
      email,
      this.clientId,
      this.clientSecret
    )
    const params = {
      AuthFlow: AuthFlowType.ADMIN_NO_SRP_AUTH,
      ClientId: this.clientId,
      UserPoolId: this.userPoolId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash
      }
    }

    const command = new AdminInitiateAuthCommand(params)
    return await this.client.send(command)
  }

  // // Iniciar recuperação de senha
  // public async forgotPassword(email: string) {
  //   const params = {
  //     ClientId: this.clientId,
  //     Username: email
  //   }

  //   const command = new ForgotPasswordCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(
  //       `Erro ao iniciar recuperação de senha: ${(error as Error).message}`
  //     )
  //   }
  // }

  // // Confirmar a nova senha após a recuperação
  // public async confirmPassword(
  //   email: string,
  //   confirmationCode: string,
  //   newPassword: string
  // ) {
  //   const params = {
  //     ClientId: this.clientId,
  //     Username: email,
  //     ConfirmationCode: confirmationCode,
  //     Password: newPassword
  //   }

  //   const command = new ConfirmForgotPasswordCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`Erro ao redefinir senha: ${(error as Error).message}`)
  //   }
  // }

  // // Iniciar a configuração de MFA
  // public async initiateMfa(email: string) {
  //   const params = {
  //     Username: email,
  //     UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  //     MFAPreference: {
  //       EmailMfaSettings: true
  //     }
  //   }

  //   const command = new AdminSetUserMFAPreferenceCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`Erro ao iniciar MFA: ${(error as Error).message}`)
  //   }
  // }

  // // Verificar o código MFA durante o login
  // public async verifyMfa(email: string, mfaCode: string) {
  //   const params = {
  //     Username: email,
  //     UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  //     TokenCode: mfaCode
  //   }

  //   const command = new VerifySoftwareTokenCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`Erro ao verificar MFA: ${(error as Error).message}`)
  //   }
  // }
}
