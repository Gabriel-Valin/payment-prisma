import { PrismaClient } from "@prisma/client"
import { Client } from "../entities/Client"
import { ContractClientsRepository } from "../types/repositories/ClientsRepository"
import { TypeClient } from "../types/requests/TypeClient"
import { prisma } from '../../../shared/infra/database'
export class ClientsPrismaRepository implements ContractClientsRepository {
    updateClient({ clientId, client }: { clientId: any; client: any }): Promise<Client> {
        throw new Error("Method not implemented.")
    }
    public async findClientById (clientId: string): Promise<Client> {
        const clientFound = await prisma.clients.findFirst({
            where: {
                id: clientId
            }
        })

        return clientFound
    }

    public async deleteClient (clientId: string): Promise<boolean> {
        const wasDeleted = await prisma.clients.delete({
            where: {
                id: clientId
            }
        })

        return !!wasDeleted
    }
    public async getClientExists(email: string): Promise<boolean> {
        const clientFound = await prisma.clients.findFirst({
            where: {
                email
            }
        })

        return !!clientFound
    }

    public async findClientByEmail (email: string): Promise<Client> {
        const client = await prisma.clients.findFirst({
            where: {
                email
            }
        })

        return client
    }
    
    public async createNewClient ({ userId, email, name, phone }: TypeClient): Promise<Client> {
        const user = await prisma.clients.create({
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