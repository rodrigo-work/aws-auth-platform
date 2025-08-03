import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/api.error'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err instanceof ApiError ? err.statusCode : 500

  // Substitua por um logger (como winston/pino) em produção
  // console.error(err)

  res.status(statusCode).json({
    // error: {
    success: false,
    message: err.message || 'Erro interno no servidor',
    // status: statusCode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    // }
  })
}
