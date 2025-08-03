import 'dotenv/config'
import { Application } from './app'

const app = new Application().init()
const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`🚀 Api running on http://localhost:${port}`)
})
