import express, { Response, Request } from 'express'
import cors from 'cors'

export const app = express()
app.use(express.json())
app.use(cors())

app.get("/health-check", (req: Request, res: Response) => {
    res.json({ status: 'live' })
})