import { inject, injectable } from "tsyringe";
import { Client } from "../../entities/Client";
import { ContractClientsRepository } from "../../types/repositories/ClientsRepository";
import { TypeUpdateClient } from "../../types/requests/TypeUpdateClient";

@injectable()
export class UpdateClientUseCase {
    constructor (
        @inject('ClientsPrismaClient')
        private readonly clientsRepository: ContractClientsRepository
    ) {}
    public async perform ({ clientId, name, email, phone }: TypeUpdateClient): Promise<Client> {
        const clientFound = await this.clientsRepository.findClientById(clientId)
        const result = await this.clientsRepository.updateClient({ clientId, name, email, phone })
        return result
    }
}