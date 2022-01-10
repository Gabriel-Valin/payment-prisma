import { BcryptAdapter } from "../../../shared/infra/cryptography/Bcrypt"
import { JwtAdapter } from "../../../shared/infra/cryptography/Jwt"
import { PrismaRepository } from "../../users/repositories/PrismaRepository"
import { UsersRepository } from "../../users/repositories/UserRepository"
import { Cryptography } from "../../users/types/hasher/Cryptography"
import { TokenizationAdapter } from "../../users/types/hasher/Jwt"
import { ContractUsersRepository } from "../../users/types/repositories/UsersRepository"
import { CreateUserUseCase } from "../../users/usecases/createUserUseCase/CreateUserUseCase"
import { ClientsPrismaRepository } from "../repositories/ClientsRepository"
import { ContractClientsRepository } from "../types/repositories/ClientsRepository"
import { CreateClientUseCase } from "./CreateClientUseCase"

let sut: CreateClientUseCase
let assistant: CreateUserUseCase
let passwordHasher: Cryptography
let usersRepository: ContractUsersRepository
let createUser: CreateUserUseCase
let clientsRepository: ContractClientsRepository

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

describe('Create Client for User', () => {
    beforeEach(() => {
        clientsRepository = new ClientsPrismaRepository()
        passwordHasher = new BcryptAdapter(8)
        usersRepository = new PrismaRepository()
        createUser = new CreateUserUseCase(passwordHasher, usersRepository)
        sut = new CreateClientUseCase(clientsRepository)
    })

    it('should be able create a new client', async () => {
        const newUser = await createUser.perform(mockUser)
        const { id } = newUser
        const result = await sut.perform({ userId: id, name: mockClient.name, email: mockClient.email, phone: mockClient.phone })
        expect(result).toHaveProperty('id')
    })
})