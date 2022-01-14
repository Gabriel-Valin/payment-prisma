import { inject, injectable } from "tsyringe";
import { BaseError } from "../../../../shared/BaseError";
import { DeletedUser } from "../../../users/types/requests/DeleteUser";
import { ContractClientsRepository } from "../../types/repositories/ClientsRepository";

@injectable()
export class DeleteClientUseCase {
    constructor (
        @inject('ClientsPrismaClient')
        private readonly clientRepository: ContractClientsRepository
    ) {}
    public async perform (clientId: string): Promise<DeletedUser> {
        const clientAlreadyExists = await this.clientRepository.findClientById(clientId)
        if (!clientAlreadyExists) {
            throw new BaseError('Client not exists.', 401)
        }

        await this.clientRepository.deleteClient(clientId)

        return {
            delete: true,
            message: 'Client was been deleted.'
        }
    }
}