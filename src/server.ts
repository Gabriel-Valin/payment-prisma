import 'dotenv/config'
import { app } from './app'

app.listen(3718, () => console.log(`Server has been started at PORT ${process.env.APP_PORT}`))