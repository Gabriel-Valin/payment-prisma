import { User } from "../entities/User"
import { ContractUsersRepository } from "../types/repositories/UsersRepository"
import { TypeUser } from "../types/requests/CreateUser"
import { prisma } from '../../../shared/infra/database'
export class PrismaRepository implements ContractUsersRepository {
    findUserByid(id: string): Promise<User> {
        throw new Error("Method not implemented.")
    }
    public async createUser({ email, password, name }: TypeUser): Promise<User> {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })

        return user
    }

    public async findUserByEmail(email : string): Promise<Boolean> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return !!user
    }

    public async getUserInfoByEmail(email: string): Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        return user
    }

    public async createRefreshToken(userId: string): Promise<void> {
        await prisma.refreshToken.create({
            data: {
                userId,
                expiresIn: 15 * 60 * 60
            }
        })
    }
}