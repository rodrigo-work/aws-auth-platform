import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { type Express } from 'express'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { AuthRoutes } from './routes/AuthRoutes'
import { HealthRoutes } from './routes/HealthRoutes'

export class Application {
  private app: Express
  private healthRoutes: HealthRoutes
  private authRoutes: AuthRoutes

  constructor() {
    this.app = express()
    this.healthRoutes = new HealthRoutes()
    this.authRoutes = new AuthRoutes()
  }

  public init(): Express {
    this.app
      .disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(cors())

    this.app.use('/', this.healthRoutes.getRouter())
    this.app.use('/auth', this.authRoutes.getRouter())

    this.app.use(notFoundHandler)
    this.app.use(errorHandler)

    return this.app
  }
}
