import { BcryptAdapter } from "../../../shared/infra/cryptography/Bcrypt"
import { UsersRepository } from "../../users/repositories/MemoryUsersRepository"
import { Cryptography } from "../../users/types/hasher/Cryptography"
import { ContractUsersRepository } from "../../users/types/repositories/UsersRepository"
import { CreateUserUseCase } from "../../users/usecases/createUserUseCase/CreateUserUseCase"
import { CreateClientUseCase } from "../createClientUseCase/CreateClientUseCase"
import { ClientsRepository } from "../repositories/MemoryClientsRepository"
import { DeleteClientUseCase } from "./DeleteClientUseCase"

let passwordHasher: Cryptography
let usersRepository: ContractUsersRepository
let createUser: CreateUserUseCase
let clientsRepository: ClientsRepository
let createClient: CreateClientUseCase
let sut: DeleteClientUseCase

let mockUser = {
    email: 'any_mail2@mail.com',
    password: 'any_pass',
    name: 'any name'
}

let mockClient = {
    name: 'New client',
    email: 'client2_@mail.com',
    phone: '1999999999'
}

describe(('Delete Client By id'), () => {
    beforeEach(() => {
        passwordHasher = new BcryptAdapter(8)
        usersRepository = new UsersRepository()
        createUser = new CreateUserUseCase(passwordHasher, usersRepository)
        clientsRepository = new ClientsRepository()
        createClient = new CreateClientUseCase(clientsRepository)
        sut = new DeleteClientUseCase(clientsRepository)
    })
    it('should be able delete client with id', async () => {
        const newUser = await createUser.perform(mockUser)
        const client = await createClient.perform({ userId: newUser.id, name: mockClient.name, email: mockClient.email, phone: mockClient.phone })
        const result = await sut.perform(client.id)
        expect(result.message).toEqual('Client was been deleted.')
    })
})