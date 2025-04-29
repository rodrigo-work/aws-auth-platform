import { Request, Response } from 'express'
import { GroupService } from '../services/GroupService'
import { AbstractController } from './AbstractController'

export class GroupController extends AbstractController {
  private readonly groupService: GroupService

  constructor() {
    super()
    this.groupService = new GroupService()
  }

  async createGroup(req: Request, res: Response) {
    const { name, description } = req.body

    try {
      await this.groupService.createGroup(name, description)
      res.status(200).json({ message: 'Group created.' })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async getAllGroup(req: Request, res: Response) {
    try {
      const data = await this.groupService.getAllGroup()
      res.json({ data: data.Groups })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async deleteGroup(req: Request, res: Response) {
    const { name } = req.body

    try {
      await this.groupService.deleteGroup(name)
      res.status(200).json({ message: 'Group deleted.' })
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
