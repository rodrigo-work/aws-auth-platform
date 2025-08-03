import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminUpdateUserAttributesCommand,
  ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { fa } from 'zod/v4/locales/index.cjs'
import type { Group } from '../schemas/groups.schema'
import { groupSchema, groupsSchema, User, type Users } from '../schemas/users.schema'
import { type PaginationResult, Paginator } from '../utils/Pagination'
import { AbstractService } from './AbstractService'

export interface UserAttribute {
  Name: string
  Value: string
}

export class UsersService extends AbstractService {
  async createUser(username: string, password: string, attributes: UserAttribute[]) {
    const command = new AdminCreateUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      TemporaryPassword: password,
      UserAttributes: attributes,
      MessageAction: 'SUPPRESS'
    })

    const response = await this.client.send(command)

    // const commandGroup = new AdminAddUserToGroupCommand({
    //   UserPoolId: this.userPoolId,
    //   Username: response.User.Username,
    //   GroupName: 'guest'
    // })
    // const responseGroup: any = await this.client.send(commandGroup)
    // console.log(responseGroup)

    return this.flattenUsers(response.User)
  }

  private async getGroupsForUser(username: string): Promise<any[]> {
    let nextToken: string | undefined
    const allGroups: any[] = []

    do {
      const response = await this.client.send(
        new AdminListGroupsForUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          Limit: 60,
          NextToken: nextToken
        })
      )

      allGroups.push(...(response.Groups ?? []))
      nextToken = response.NextToken
    } while (nextToken)

    return allGroups
  }

  async getAllUsers(page = 1, limit = 10): Promise<PaginationResult<unknown>> {
    let nextToken: string | undefined
    let allUsers: Users = []

    do {
      const command = new ListUsersCommand({
        UserPoolId: this.userPoolId,
        Limit: 60, // Cognito's max allowed limit
        PaginationToken: nextToken
      })

      const response = await this.client.send(command)
      allUsers = allUsers.concat(response.Users ?? [])
      nextToken = response.PaginationToken
    } while (nextToken)

    const total = allUsers.length
    const offset = (page - 1) * limit
    const paginatedUsers = allUsers.slice(offset, offset + limit)

    const usersWithGroups = await Promise.all(
      paginatedUsers.map(async (user) => {
        const username = user.Username

        const groups = await this.getGroupsForUser(username)

        return {
          ...this.flattenUsers(user),
          groups: groups.map((group) => group.GroupName)
        }
      })
    )

    return Paginator.buildResult(total, page, limit, usersWithGroups)
  }

  async updateUser(username: string, attributes: UserAttribute[]) {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      UserAttributes: attributes
    })

    const result = await this.client.send(command)
    return result
  }

  async deleteUser(name: string) {
    const command = new AdminDeleteUserCommand({
      UserPoolId: this.userPoolId,
      Username: name
    })

    const result = await this.client.send(command)
    return result
  }

  async getUsersById(username: string) {
    const userCommand = new AdminGetUserCommand({
      UserPoolId: this.userPoolId,
      Username: username
    })

    const userResponse = await this.client.send(userCommand)
    const groups = await this.getGroupsForUser(username)

    return {
      ...this.flattenUsers(userResponse),
      groups: groups.map((group) => group.GroupName)
    }
  }

  async addUserGroup(username: string, name: string) {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name,
      Username: username
    })

    const result = await this.client.send(command)
    return result
  }

  async removeUserGroup(username: string, name: string) {
    const command = new AdminRemoveUserFromGroupCommand({
      UserPoolId: this.userPoolId,
      GroupName: name,
      Username: username
    })

    const result = await this.client.send(command)
    return result
  }
}
