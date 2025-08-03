import type { Request, Response } from 'express'
import lodash from 'lodash'
import { UsersService } from '../services/users.service'
import { ResponseError } from '../utils/customErrors'
import { AbstractController } from './AbstractController'

export class UsersController extends AbstractController {
  private readonly usersService: UsersService

  constructor() {
    super()
    this.usersService = new UsersService()
  }

  createUser(req: Request, res: Response) {
    const { username, given_name, family_name, password } = req.body

    try {
      // if (!Array.isArray(attributes)) {
      //   res.status(400).json({ error: 'Atributos devem ser um array' })
      // }

      const attributesattributes = [
        {
          Name: 'email',
          Value: username
        },
        {
          Name: 'given_name',
          Value: given_name
        },
        {
          Name: 'family_name',
          Value: family_name
        }
      ]

      // Pega apenas os atributos desejados
      const selectedFields = lodash.pick(req.body, ['username', 'given_name', 'family_name'])

      // Mapeia para o formato desejado
      const attributes = lodash.map(selectedFields, (value, key) => ({
        // Name: key === 'username' ? 'email' : key,
        Name: key,
        Value: value
      }))

      // const data = await this.usersService.createUser(username, password, attributes)
      res.status(200).json(attributes)
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    try {
      const data = await this.usersService.getAllUsers(page, limit)
      res.status(200).json(data)
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async updateUser(req: Request, res: Response) {
    const { username } = req.params
    const { gender, name } = req.body

    const attributes = [
      {
        Name: 'gender',
        Value: gender
      },
      {
        Name: 'name',
        Value: name
      }
    ]

    try {
      if (!Array.isArray(attributes)) {
        res.status(400).json({ error: 'Atributos devem ser um array' })
      }

      const data = await this.usersService.updateUser(username, attributes)
      res.status(200).json(data)
    } catch (error) {
      // throw new ResponseError(error, 400)

      res.json(error)
      // this.handleError(res, error)
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { username } = req.params

    try {
      const data = await this.usersService.deleteUser(username)
      res.status(200).json(data)
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async getUsersById(req: Request, res: Response) {
    try {
      const data = await this.usersService.getUsersById(req.params.username)
      res.status(200).json({ data })
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async addUserGroup(req: Request, res: Response) {
    const { username, name } = req.params

    try {
      const data = await this.usersService.addUserGroup(username, name)
      res.status(200).json({ data })
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async removeUserGroup(req: Request, res: Response) {
    const { username, name } = req.params

    try {
      const data = await this.usersService.removeUserGroup(username, name)
      res.status(200).json({ data })
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }
}
