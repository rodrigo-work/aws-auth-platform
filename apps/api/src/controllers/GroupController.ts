import { Request, Response } from 'express'
import { GroupService } from '../services/GroupService'
import { AbstractController } from './AbstractController'

export class GroupController extends AbstractController {
  private readonly groupService: GroupService

  constructor() {
    super()
    this.groupService = new GroupService()
  }

  public async getStatus(_: Request, res: Response): Promise<void> {
    try {
      const status: string = await this.groupService.getStatus()
      this.handleResponse(res, { status })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body

    try {
      const data = await this.groupService.createGroup(name, description)
      res.status(200).json({ message: data })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    const data = await this.groupService.listGroup()
    res.status(200).json(data)
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { name, description, precedence } = req.body

    try {
      const data = await this.groupService.updateGroup(
        name,
        description,
        precedence
      )
      res.status(200).json({ message: data })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { name } = req.body

    try {
      const data = await this.groupService.deleteGroup(name)
      res.status(200).json({ message: data })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }
}
