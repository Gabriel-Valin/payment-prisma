import { inject } from "tsyringe"
import { Client } from "../../entities/Client"
import { ClientsRepository } from "../../repositories/MemoryClientsRepository"

let clientsRepository: ClientsRepository
let sut: ListAllClientsUseCase

class ListAllClientsUseCase {
    constructor (
        @inject('ClientsPrismaClient')
        private readonly clientsRepository: ClientsRepository
    ) {}
    public async perform (userId: string): Promise<Client[]> {
        const clients = await this.clientsRepository.findClientsByUserId(userId)
        return clients
    }
}

let mockClient = {
    name: 'New client1',
    email: 'client1_@mail.com',
    phone: '1999999999',
    userId: 'user_1'
}

let mockClient2 = {
    name: 'New client2',
    email: 'client2_@mail.com',
    phone: '1999999999',
    userId: 'user_2'
}

describe(('List all clients by user'), () => {
    beforeEach(() => {
        clientsRepository = new ClientsRepository()
        sut = new ListAllClientsUseCase(clientsRepository)
    })

    it('should be able list all client by userId', async () => {
        await clientsRepository.createNewClient(mockClient)
        const second = await clientsRepository.createNewClient(mockClient2)
        const result = await sut.perform(second.userId)
        expect(result).toEqual([second])
    })
})