import { inject } from "tsyringe"
import { BaseError } from "../../../../shared/BaseError"
import { Client } from "../../entities/Client"
import { ClientsRepository } from "../../repositories/MemoryClientsRepository"

let clientsRepository: ClientsRepository
let sut: ListIndividualClientUseCase

class ListIndividualClientUseCase {
    constructor (
        @inject('ClientPrismaClient')
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

let mockClient = {
    name: 'New client1',
    email: 'client1_@mail.com',
    phone: '1999999999',
    userId: 'user_1'
}


describe(('List all clients by user'), () => {
    beforeEach(() => {
        clientsRepository = new ClientsRepository()
        sut = new ListIndividualClientUseCase(clientsRepository)
    })

    it('should be able list unique client by userId', async () => {
        const client = await clientsRepository.createNewClient(mockClient)
        const result = await sut.perform(client.id)
        expect(result.name).toEqual(mockClient.name)
    })

    it('should not be able list unique client with invalid id', async () => {
        const client = await clientsRepository.createNewClient(mockClient)
        await expect(sut.perform('invalid_id')).rejects.toBeInstanceOf(BaseError)
    })
})