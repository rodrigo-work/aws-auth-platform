import type { NextFunction, Request, Response } from 'express'
import type { ZodObject, ZodRawShape } from 'zod'
import { PersonalError } from '../utils/customErrors'
import { formatZodError } from '../utils/parserErrors'

export const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    // console.error(result)

    if (!result.success) {
      const message = formatZodError(result.error)
      return next(new PersonalError(message, 400))
    }

    next()
  }
