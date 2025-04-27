import {
  AdminConfirmSignUpCommand,
  AdminInitiateAuthCommand,
  AdminSetUserMFAPreferenceCommand,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
  SignUpCommand,
  VerifySoftwareTokenCommand
} from '@aws-sdk/client-cognito-identity-provider'

export class AuthService {
  private client: CognitoIdentityProviderClient
  private clientId: string
  private userPoolId: string

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION!
    })
    this.clientId = process.env.COGNITO_CLIENT_ID!
    this.userPoolId = process.env.COGNITO_USER_POOL_ID!
  }

  public async getStatus(): Promise<string> {
    // Aqui poderia estar lógica de negócio, chamada externa, etc.
    return 'Auth Service OK!'
  }

  public async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const params = {
      ClientId: this.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'name', Value: firstName ?? '' },
        { Name: 'family_name', Value: lastName ?? '' }
      ]
    }

    const command = new SignUpCommand(params)

    try {
      return await this.client.send(command)
    } catch (error) {
      throw new Error(`${(error as Error).message}`)
    }
  }

  // Confirmar o registro do usuário
  public async confirmSignUp(email: string, confirmationCode: string) {
    const params = {
      Username: email,
      ConfirmationCode: confirmationCode,
      ClientId: this.clientId,
      UserPoolId: process.env.COGNITO_USER_POOL_ID!
    }

    const command = new AdminConfirmSignUpCommand(params)
    try {
      await this.client.send(command)
    } catch (error) {
      throw new Error(
        `Erro ao confirmar o registro: ${(error as Error).message}`
      )
    }
  }

  // Autenticar o usuário com e-mail e senha
  public async authenticateUser(email: string, password: string) {
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',

      ClientId: this.clientId,
      UserPoolId: this.userPoolId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    }

    const command = new AdminInitiateAuthCommand(params)
    try {
      const data = await this.client.send(command)
      return data.AuthenticationResult!
    } catch (error) {
      throw new Error(`Erro ao autenticar usuário: ${(error as Error).message}`)
    }
  }

  // Iniciar recuperação de senha
  public async forgotPassword(email: string) {
    const params = {
      ClientId: this.clientId,
      Username: email
    }

    const command = new ForgotPasswordCommand(params)
    try {
      await this.client.send(command)
    } catch (error) {
      throw new Error(
        `Erro ao iniciar recuperação de senha: ${(error as Error).message}`
      )
    }
  }

  // Confirmar a nova senha após a recuperação
  public async confirmPassword(
    email: string,
    confirmationCode: string,
    newPassword: string
  ) {
    const params = {
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword
    }

    const command = new ConfirmForgotPasswordCommand(params)
    try {
      await this.client.send(command)
    } catch (error) {
      throw new Error(`Erro ao redefinir senha: ${(error as Error).message}`)
    }
  }

  // Iniciar a configuração de MFA
  public async initiateMfa(email: string) {
    const params = {
      Username: email,
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      MFAPreference: {
        EmailMfaSettings: true
      }
    }

    const command = new AdminSetUserMFAPreferenceCommand(params)
    try {
      await this.client.send(command)
    } catch (error) {
      throw new Error(`Erro ao iniciar MFA: ${(error as Error).message}`)
    }
  }

  // Verificar o código MFA durante o login
  public async verifyMfa(email: string, mfaCode: string) {
    const params = {
      Username: email,
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      TokenCode: mfaCode
    }

    const command = new VerifySoftwareTokenCommand(params)
    try {
      await this.client.send(command)
    } catch (error) {
      throw new Error(`Erro ao verificar MFA: ${(error as Error).message}`)
    }
  }
}
