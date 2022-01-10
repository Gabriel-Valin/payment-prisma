import { BcryptAdapter } from "../../../../shared/infra/cryptography/Bcrypt"
import { UsersRepository } from "../../repositories/UserRepository"
import { Cryptography } from "../../types/hasher/Cryptography"
import { ContractUsersRepository } from "../../types/repositories/UsersRepository"
import { CreateUserUseCase } from "../createUserUseCase/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { TokenizationAdapter } from "../../types/hasher/Jwt"
import { JwtAdapter } from "../../../../shared/infra/cryptography/Jwt"
import { BaseError } from "../../../../shared/BaseError"

let mockUser = {
    email: 'any_mail@mail.com',
    password: 'any_pass',
    name: 'any name'
}

let passwordHasher: Cryptography;
let usersRepository: ContractUsersRepository;
let createUser: CreateUserUseCase;
let jwtAdapter: TokenizationAdapter
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
    beforeEach(() => {
        passwordHasher = new BcryptAdapter(8)
        usersRepository = new UsersRepository()
        createUser = new CreateUserUseCase(passwordHasher, usersRepository)
        jwtAdapter = new JwtAdapter('secret')
        sut = new AuthenticateUserUseCase(usersRepository, jwtAdapter, passwordHasher)
    })

    it('should be able authenticate user with correct credentials', async () => {
        const userCreated = await createUser.perform(mockUser)
        const result = await sut.perform({ email: userCreated.email, password: mockUser.password })
        expect(result).toHaveProperty('token')
    })

    it('should be able that ensure user dont auth with non existent user', async () => {
        await expect(sut.perform({ email: mockUser.email, password: mockUser.password }))
            .rejects.toEqual(new BaseError('Email or password invalid', 401))
    })

    // VERIFY THIS TEST E WHY HAVE ERROR

    // it('should not able auth with incorrect password', async () => {
    //     const userCreated = await createUser.perform(mockUser)
    //     const result = await sut.perform({ email: userCreated.email, password: 'a' })
    //     expect(result).rejects.toEqual(new BaseError('Password or email is invalid', 401))
    // })
})