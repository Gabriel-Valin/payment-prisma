import { ClientsRepository } from "../../repositories/MemoryClientsRepository"
import { UpdateClientUseCase } from "./UpdateClientUseCase"

let clientsRepository: ClientsRepository
let sut: UpdateClientUseCase

let mockClient = {
    userId: 'anyid',
    name: 'client new',
    email: 'anyclient@gmail.com',
    phone: 'any_phone'
}

describe(('Update client by clientId'), () => {
    beforeEach(() => {
        clientsRepository = new ClientsRepository()
        sut = new UpdateClientUseCase(clientsRepository)
    })
    it('should be able update client by clientId', async () => {
        const newClient = await clientsRepository.createNewClient(mockClient)
        const result = await sut.perform({ clientId: newClient.id, name: newClient.name, email: newClient.email, phone: newClient.phone })
        expect(result.name).toEqual(mockClient.name)
        expect(result).toHaveProperty('id')
    })
})