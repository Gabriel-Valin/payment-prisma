import 'reflect-metadata'
import './shared/infra/container'
import 'dotenv/config'
import 'express-async-errors'
import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import { router } from './shared/http'
import applicationErrorMiddleware from './shared/http/middlewares/ApplicationError'

export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.use(applicationErrorMiddleware());

app.get("/", (req: Request, res: Response) => {
    res.json({ status: 'live' })
})
