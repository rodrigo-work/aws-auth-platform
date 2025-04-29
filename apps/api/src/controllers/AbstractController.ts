/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

export abstract class AbstractController {
  protected handleError(res: Response, error: unknown): void {
    const data = {
      status: (error as any)?.$metadata?.httpStatusCode || 500,
      name: (error as any)?.name || '500',
      message: (error as any)?.message || 'Unexpected error occurred'
    }

    if (error instanceof Error) {
      res
        .status(data.status)
        .json({ status: data.status, name: data.name, message: data.message })
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' })
    }
  }
}
