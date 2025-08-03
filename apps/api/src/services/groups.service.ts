import {
  CreateGroupCommand,
  DeleteGroupCommand,
  GetGroupCommand,
  ListGroupsCommand,
  ListUsersInGroupCommand,
  UpdateGroupCommand
} from '@aws-sdk/client-cognito-identity-provider'
import type { Group } from '../schemas/groups.schema'
import { User } from '../schemas/users.schema'
import { type PaginationResult, Paginator } from '../utils/Pagination'
import { AbstractService } from './AbstractService'

export class GroupsService extends AbstractService {
  async createGroup(name: string) {
    const command = new CreateGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name
    })

    const result = await this.client.send(command)
    return this.flattenGroups(result.Group)
  }

  async getAllGroups(page = 1, limit = 10): Promise<PaginationResult<unknown>> {
    let nextToken: string | undefined
    let allUsers: Group[] = []

    const command = new ListGroupsCommand({
      UserPoolId: this.userPoolId,
      Limit: 60, // Cognito's max allowed limit
      NextToken: nextToken
    })

    do {
      const response = await this.client.send(command)
      allUsers = allUsers.concat(response.Groups ?? [])
      nextToken = response.NextToken
    } while (nextToken)

    const total = allUsers.length
    const offset = (page - 1) * limit
    const paginatedUsers = allUsers.slice(offset, offset + limit)

    const usersWithGroups = await Promise.all(
      paginatedUsers.map(async (user) => {
        const name = user.GroupName

        const users = await this.getUsersInGroup(name)

        return {
          ...this.flattenGroups(user),
          users: users.map(
            (group) => group.Attributes?.find((attr) => attr.Name === 'email')?.Value
          )
          // users: users.map((group) => {
          //   return {
          //     // username: group.Username,
          //     // name: group.Attributes?.find((attr) => attr.Name === 'name')?.Value,
          //     email: group.Attributes?.find((attr) => attr.Name === 'email')?.Value
          //   }
          // })
        }
      })
    )

    return Paginator.buildResult(total, page, limit, usersWithGroups)
  }

  async updateGroup(name: string, description: string, precedence: number) {
    const command = new UpdateGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name,
      Description: description,
      Precedence: precedence
    })

    const result = await this.client.send(command)
    return this.flattenGroups(result.Group)
  }

  async deleteGroup(name: string) {
    const command = new DeleteGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name
    })

    const result = await this.client.send(command)
    return result
  }

  async getGroupById(name: string) {
    const command = new GetGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name
    })

    const response = await this.client.send(command)
    const users = await this.getUsersInGroup(name)

    return {
      ...this.flattenGroups(response.Group),
      // users: this.flattenUsers(users),
      users: users.map((group) => group.Username)
    }
  }

  private async getUsersInGroup(groupName: string): Promise<any[]> {
    let nextToken: string | undefined
    let users: any[] = []

    do {
      const response = await this.client.send(
        new ListUsersInGroupCommand({
          UserPoolId: this.userPoolId,
          GroupName: groupName,
          Limit: 60,
          NextToken: nextToken
        })
      )

      users = users.concat(response.Users ?? [])
      nextToken = response.NextToken
    } while (nextToken)

    return users
  }
}
