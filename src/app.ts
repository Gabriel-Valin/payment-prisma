import express, { Response, Request } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

export const app = express()
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()

app.get("/health-check", (req: Request, res: Response) => {
    res.json({ status: 'live' })
})

app.get('/prisma', async (req: Request, res: Response) => {
    const user = await prisma.user.create({
        data: {
            name: 'Gabriel',
            email: 'gabrielvalincontato@gmail.com'
        }
    })

    res.json({ user })
})