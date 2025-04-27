import { NextFunction, Request, Response } from 'express'

interface AppError extends Error {
  statusCode?: number
  details?: any
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[${req.method}] ${req.url} - ${status}: ${message}`)

  res.status(status).json({
    // success: false,
    status,
    message,
    ...(err.details && { details: err.details })
  })
}
