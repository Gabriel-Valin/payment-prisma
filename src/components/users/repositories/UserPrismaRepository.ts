import { PrismaClient } from "@prisma/client"
import { User } from "../entities/User"
import { ContractUsersRepository } from "../types/repositories/UsersRepository"
import { TypeUser } from "../types/requests/CreateUser"
import { prisma } from '../../../shared/infra/database'
export class PrismaRepository implements ContractUsersRepository {
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
}