import { inject, injectable } from "tsyringe"
import { BaseError } from "../../../../shared/BaseError"
import { Client } from "../../entities/Client"
import { ContractClientsRepository } from "../../types/repositories/ClientsRepository"
import { TypeClient } from "../../types/requests/TypeClient"

@injectable()
export class CreateClientUseCase {
    constructor (
        @inject('ClientsPrismaClient')
        private readonly clientRepository: ContractClientsRepository
    ) {}
    public async perform({ userId, name, email, phone }): Promise<Client> {
        const clientAlreadyExists = await this.clientRepository.getClientExists(email)
        if (clientAlreadyExists) {
            throw new BaseError('Already exists a client with this email.', 401)
        }
        const createClient = await this.clientRepository.createNewClient({ userId, name, email, phone })
        return createClient
    }
}

