import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { type Express } from 'express'
import morgan from 'morgan'
import { AuthRoutes } from './routes/AuthRoutes'
import { GroupRoutes } from './routes/GroupRoutes'
import { HealthRoutes } from './routes/HealthRoutes'
import { UserRoutes } from './routes/UserRoutes'

export class Application {
  private app: Express
  private healthRoutes: HealthRoutes
  private authRoutes: AuthRoutes
  private groupRoutes: GroupRoutes
  private userRoutes: UserRoutes

  constructor() {
    this.app = express()
    this.healthRoutes = new HealthRoutes()
    this.authRoutes = new AuthRoutes()
    this.groupRoutes = new GroupRoutes()
    this.userRoutes = new UserRoutes()
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
    this.app.use('/groups', this.groupRoutes.getRouter())
    this.app.use('/users', this.userRoutes.getRouter())

    this.app.use((req, res, next) => {
      res.status(404).json({ status: 404, message: 'Not found' })
      next()
    })

    this.app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).send({ status: 500, message: 'Internal server error' })
      next()
    })

    return this.app
  }
}
