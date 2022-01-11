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
        console.log(clientAlreadyExists)
        if (!clientAlreadyExists) {
            throw new BaseError('Client not exists.', 401)
        }

        const wasDeleted = await this.clientRepository.deleteClient(clientId)

        if (!wasDeleted) {
            throw new BaseError('Error in delete user method.', 500)
        }

        return {
            delete: true,
            message: 'Client was been deleted.'
        }
    }
}