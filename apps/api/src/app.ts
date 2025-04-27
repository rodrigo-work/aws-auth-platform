import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { type Express } from 'express'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { HealthRoutes } from './routes/HealthRoutes'

export class Application {
  private app: Express
  private healthRoutes: HealthRoutes

  constructor() {
    this.app = express()
    this.healthRoutes = new HealthRoutes()
  }

  public init(): Express {
    this.app
      .disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(cors())

    this.app.use('/', this.healthRoutes.getRouter())

    this.app.use(notFoundHandler)
    this.app.use(errorHandler)

    return this.app
  }
}
