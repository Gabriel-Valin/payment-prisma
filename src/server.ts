import { app } from './app'

app.listen(process.env.APP_PORT, () => console.log(`Server has been started at PORT ${process.env.APP_PORT}`))
