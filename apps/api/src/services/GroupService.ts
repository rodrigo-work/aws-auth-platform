import {
  CognitoIdentityProviderClient,
  CreateGroupCommand,
  DeleteGroupCommand,
  GroupType,
  ListGroupsCommand,
  ListGroupsRequest,
  ListGroupsResponse
} from '@aws-sdk/client-cognito-identity-provider'
import { AbstractService } from './AbstractService'

export class GroupService extends AbstractService {
  private client: CognitoIdentityProviderClient
  private clientId: string

  constructor() {
    super()
    this.client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION!
    })
    this.clientId = process.env.COGNITO_CLIENT_ID!
  }

  public async createGroup(
    name: string,
    description: string
  ): Promise<unknown> {
    const params = {
      UserPoolId: this.userPoolId,
      GroupName: name,
      Description: description
    }

    const command = new CreateGroupCommand(params)

    try {
      return await this.client.send(command)
    } catch (error) {
      throw new Error(`${(error as Error).message}`)
    }
  }

  public async listGroup(): Promise<GroupType[] | undefined> {
    const input: ListGroupsRequest = {
      UserPoolId: this.userPoolId
    }

    const command = new ListGroupsCommand(input)

    try {
      const response: ListGroupsResponse = await this.client.send(command)
      return response.Groups
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async deleteGroup(name: string): Promise<unknown> {
    const params = {
      UserPoolId: this.userPoolId,
      GroupName: name
    }

    const command = new DeleteGroupCommand(params)

    try {
      return await this.client.send(command)
    } catch (error) {
      throw new Error(`${(error as Error).message}`)
    }
  }
}
