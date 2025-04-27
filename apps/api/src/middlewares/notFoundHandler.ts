import { NextFunction, Request, Response } from 'express'

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: any = new Error(`Not Found`)
  error.statusCode = 404
  next(error)
}
