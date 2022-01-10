import { PrismaClient } from "@prisma/client"
import { User } from "../../users/entities/User"
import { ContractUsersRepository } from "../../users/types/repositories/UsersRepository"
import { TypeUser } from "../../users/types/requests/CreateUser"
import { Client } from "../entities/Client"
import { ContractClientsRepository } from "../types/repositories/ClientsRepository"
import { TypeClient } from "../types/requests/TypeClient"


export class ClientsPrismaRepository implements ContractClientsRepository {
    private client: PrismaClient
    constructor () {
        this.client = new PrismaClient()
    }
    public async getClientExists(email: string): Promise<boolean> {
        const clientFound = await this.client.clients.findFirst({
            where: {
                email
            }
        })

        return !!clientFound
    }

    public async findClientByEmail (email: string): Promise<Client> {
        const client = await this.client.clients.findFirst({
            where: {
                email
            }
        })

        return client
    }
    
    public async createNewClient ({ userId, email, name, phone }: TypeClient): Promise<Client> {
        const user = await this.client.clients.create({
            data: {
                userId,
                email,
                name,
                phone
            }
        })

        return user
    }
}