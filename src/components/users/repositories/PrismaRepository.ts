import { PrismaClient } from "@prisma/client"
import { User } from "../entities/User"
import { ContractUsersRepository } from "../types/repositories/UsersRepository"
import { TypeUser } from "../types/requests/CreateUser"

export class PrismaRepository implements ContractUsersRepository {
    private client: PrismaClient
    constructor () {
        this.client = new PrismaClient()
    }

    public async createUser({ email, password, name }: TypeUser): Promise<User> {
        const user = await this.client.user.create({
            data: {
                email,
                name,
                password
            }
        })

        return user
    }

    public async findUserByEmail(email : string): Promise<Boolean> {
        const user = await this.client.user.findFirst({
            where: {
                email
            }
        })
        return !!user
    }
}