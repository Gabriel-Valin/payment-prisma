import { inject } from "tsyringe"
import { Client } from "../../entities/Client"
import { ClientsRepository } from "../../repositories/MemoryClientsRepository"

export class ListAllClientsUseCase {
    constructor (
        @inject('ClientsPrismaClient')
        private readonly clientsRepository: ClientsRepository
    ) {}
    public async perform (userId: string): Promise<Client[]> {
        const clients = await this.clientsRepository.findClientsByUserId(userId)
        return clients
    }
}