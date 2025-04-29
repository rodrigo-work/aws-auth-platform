import { ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider'
import { AbstractService } from './AbstractService'

type Attribute = {
  Name: string
  Value: string
}

type OriginalUser = {
  Attributes: Attribute[]
  Enabled: boolean
  UserCreateDate: string
  UserLastModifiedDate: string
  UserStatus: string
  Username: string
}

type FlattenedUser = {
  [key: string]: string | boolean
}

function flattenUser(user: OriginalUser): FlattenedUser {
  const flattened: FlattenedUser = {}

  user.Attributes.forEach((attr) => {
    flattened[attr.Name] = attr.Value
  })

  flattened['Enabled'] = user.Enabled
  flattened['UserCreateDate'] = user.UserCreateDate
  flattened['UserLastModifiedDate'] = user.UserLastModifiedDate
  flattened['UserStatus'] = user.UserStatus
  flattened['Username'] = user.Username

  return flattened
}

function flattenUsers(users: OriginalUser[]): FlattenedUser[] {
  return users.map(flattenUser)
}

export class UserService extends AbstractService {
  constructor() {
    super()
  }

  async getAllUser() {
    const command = new ListUsersCommand({
      UserPoolId: this.userPoolId
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await this.client.send(command)

    return flattenUsers(response.Users)
  }
}
