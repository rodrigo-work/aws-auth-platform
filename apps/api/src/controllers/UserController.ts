import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { AbstractController } from './AbstractController'

export class UserController extends AbstractController {
  private readonly userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  async getAllUser(_: Request, res: Response) {
    try {
      const data = await this.userService.getAllUser()
      res.json({ data: data })
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
