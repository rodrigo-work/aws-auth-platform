import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import apicache from 'apicache'
import express, { type Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middlewares/errorHandler'
import { AuthRoutes } from './routes/AuthRoutes'
import { GroupsRoutes } from './routes/groups.routes'
import { HealthRoutes } from './routes/HealthRoutes'
import { UsersRoutes } from './routes/users.routes'
import swaggerSpec from './utils/swagger'

const cache = apicache.middleware
apicache.options({ debug: true })

export class Application {
  private app: Express
  private healthRoutes: HealthRoutes
  private authRoutes: AuthRoutes
  private groupRoutes: GroupsRoutes
  private usersRoutes: UsersRoutes

  constructor() {
    this.app = express()
    this.healthRoutes = new HealthRoutes()
    this.authRoutes = new AuthRoutes()
    this.groupRoutes = new GroupsRoutes()
    this.usersRoutes = new UsersRoutes()
  }

  init(): Express {
    this.app
      // .disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(cors())
    // .use(cache('3 minutes'))

    this.app.use('/api/auth', this.authRoutes.getRouter())
    this.app.use('/api/users', this.usersRoutes.getRouter())
    this.app.use('/api/groups', this.groupRoutes.getRouter())

    this.app.use('/', this.healthRoutes.getRouter())
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    this.app.use(errorHandler)

    this.app.use((req, res, next) => {
      res.status(404).json({ status: 404, message: 'Not found' })
      // next(new ApiError(404, `Rota ${req.originalUrl} não encontrada.`))
      next()
    })

    // this.app.use((err, req, res, next) => {
    //   console.error(err.stack)
    //   res.status(500).send({ status: 500, message: 'Internal server error' })
    //   next()
    // })

    return this.app
  }
}
