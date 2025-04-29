import {
  CreateGroupCommand,
  DeleteGroupCommand,
  ListGroupsCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { AbstractService } from './AbstractService'

export class GroupService extends AbstractService {
  constructor() {
    super()
  }

  async createGroup(name: string, description: string) {
    const command = new CreateGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name,
      Description: description
    })
    return await this.client.send(command)
  }

  async getAllGroup() {
    const command = new ListGroupsCommand({
      UserPoolId: this.userPoolId
    })
    return await this.client.send(command)
  }

  async deleteGroup(name: string) {
    const command = new DeleteGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name
    })
    return await this.client.send(command)
  }
}
