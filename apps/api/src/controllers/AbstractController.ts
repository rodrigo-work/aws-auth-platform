import { Response } from 'express'

export abstract class AbstractController {
  protected handleResponse<T>(
    res: Response,
    data: T,
    statusCode: number = 200
  ): void {
    res.status(statusCode).json(data)
  }

  protected handleError(res: Response, error: unknown): void {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' })
    }
  }
}
