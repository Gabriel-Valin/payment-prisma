import express, { Response, Request } from 'express'
import cors from 'cors'
import { router } from './shared/http'

export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.get("/", (req: Request, res: Response) => {
    res.json({ status: 'live' })
})
