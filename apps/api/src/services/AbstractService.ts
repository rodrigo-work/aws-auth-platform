import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import lodash from 'lodash'
import { groupMinimalSchema, groupSchema } from '../schemas/groups.schema'
import { type User, type UserAttributes, type Users, userSchema } from '../schemas/users.schema'
import { renameAndOrder } from '../utils/parsers'

const groupRenameMap = {
  GroupName: 'name',
  Description: 'description',
  Precedence: 'precedence',
  CreationDate: 'createdAt',
  LastModifiedDate: 'updatedAt'
}

const userRenameMap = {
  Username: 'username',
  Enabled: 'enabled',
  UserStatus: 'user_status',
  UserCreateDate: 'createdAt',
  UserLastModifiedDate: 'updatedAt'
}

const userAttributeRenameMap = {
  'custom:role': 'role',
  'custom:settings': 'settings'
}

export abstract class AbstractService {
  protected readonly client: CognitoIdentityProviderClient
  protected readonly clientId: string
  protected readonly clientSecret: string
  protected readonly userPoolId: string

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION!
    })
    this.clientId = process.env.COGNITO_CLIENT_ID!
    this.clientSecret = process.env.COGNITO_CLIENT_SECRET!
    this.userPoolId = process.env.COGNITO_USER_POOL_ID!
  }

  protected flattenGroups(obj: any) {
    const isArray = Array.isArray(obj)
    const objAttr = isArray ? obj : [obj]

    const result = objAttr.map((g) => {
      // const isAttributes = u.Attributes ?? u.UserAttributes ?? []

      const user = groupSchema.parse(g)
      const users = lodash.mapKeys(
        user,
        (_value, key) => groupRenameMap[key as keyof typeof groupRenameMap] || key
      )

      // const attribute = lodash.fromPairs(
      //   isAttributes.map((attrs: { Name: string; Value: string }) => [attrs.Name, attrs.Value])
      // )
      // const attributes = lodash.mapKeys(
      //   attribute,
      //   (_value, key) => userAttributeRenameMap[key as keyof typeof userAttributeRenameMap] || key
      // )

      return {
        ...users
        // ...attributes
      }
    })

    return isArray ? result : result[0]
  }

  protected flattenUsers(obj: any) {
    const isArray = Array.isArray(obj)
    const objAttr = isArray ? obj : [obj]

    const result = objAttr.map((u) => {
      const isAttributes = u.Attributes ?? u.UserAttributes ?? []

      const user = userSchema.parse(u)
      const users = lodash.mapKeys(
        user,
        (_value, key) => userRenameMap[key as keyof typeof userRenameMap] || key
      )

      const attribute = lodash.fromPairs(
        isAttributes.map((attrs: { Name: string; Value: string }) => [attrs.Name, attrs.Value])
      )
      const attributes = lodash.mapKeys(
        attribute,
        (_value, key) => userAttributeRenameMap[key as keyof typeof userAttributeRenameMap] || key
      )

      return {
        ...attributes,
        ...users
      }
    })

    return isArray ? result : result[0]
  }
}

// import _ from 'lodash'

// const user = {
//   given_name: 'Fake',
//   family_name: 'User',
//   username: 'me+fake@rodrigo3d.com',
//   password: 'fake123'
// }

// // Dicionário de substituição de chaves
// const keyMap = {
//   username: 'email'
// }

// // Substitui as chaves conforme o map
// const renamedUser = _.mapKeys(user, (value, key) => keyMap[key] || key)

// console.log(renamedUser)
