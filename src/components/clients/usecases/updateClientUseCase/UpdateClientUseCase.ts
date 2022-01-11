import { inject } from "tsyringe";
import { Client } from "../../entities/Client";
import { ContractClientsRepository } from "../../types/repositories/ClientsRepository";
import { TypeUpdateClient } from "../../types/requests/TypeUpdateClient";

export class UpdateClientUseCase {
    constructor (
        @inject('ClientsPrismaRepository')
        private readonly clientsRepository: ContractClientsRepository
    ) {}
    public async perform ({ clientId, client }: TypeUpdateClient): Promise<Client> {
        const clientFound = await this.clientsRepository.findClientById(clientId)
        const result = await this.clientsRepository.updateClient({ clientId, client })
        return result
    }
}