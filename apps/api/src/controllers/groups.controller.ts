import type { Request, Response } from 'express'
import type { Group } from '../schemas/groups.schema'
import { GroupsService } from '../services/groups.service'
import { ResponseError } from '../utils/customErrors'
import { AbstractController } from './AbstractController'

export class GroupsController extends AbstractController {
  private readonly groupService: GroupsService

  constructor() {
    super()
    this.groupService = new GroupsService()
  }

  async createGroup(req: Request, res: Response) {
    const { name } = req.body

    try {
      const data = await this.groupService.createGroup(name)
      res.status(201).json({ success: true, message: 'Grupo criado com sucesso.', data })
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async updateGroup(req: Request, res: Response) {
    const { name } = req.params
    const { description, precedence } = req.body

    try {
      const data = await this.groupService.updateGroup(name, description, precedence)
      res.status(200).json({ success: true, message: 'Grupo atualizado com sucesso.', data })
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async deleteGroup(req: Request, res: Response) {
    const { name } = req.params

    try {
      const data = await this.groupService.deleteGroup(name)
      res.status(200).json(data)
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async getAllGroups(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    try {
      const data = await this.groupService.getAllGroups(page, limit)
      res.status(200).json(data)
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }

  async getGroupById(req: Request, res: Response) {
    const { name } = req.params

    try {
      const data = await this.groupService.getGroupById(name)
      res.status(200).json(data)
    } catch (error) {
      throw new ResponseError(error, 400)
    }
  }
}
