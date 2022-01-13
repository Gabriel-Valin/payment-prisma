import { inject, injectable } from "tsyringe"
import { BaseError } from "../../../../shared/BaseError"
import { Client } from "../../entities/Client"
import { ClientsRepository } from "../../repositories/MemoryClientsRepository"

@injectable()
export class ListIndividualClientUseCase {
    constructor (
        @inject('ClientsPrismaClient')
        private readonly clientsRepository: ClientsRepository
    ) {}
    public async perform (clientId: string): Promise<Client> {
        const client = await this.clientsRepository.findClientById(clientId)

        if (!client) {
            throw new BaseError('Client id is invalid.', 401)
        }

        return client
    }
}