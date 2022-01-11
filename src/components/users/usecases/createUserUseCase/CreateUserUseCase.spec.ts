import { BaseError } from "../../../../shared/BaseError"
import { BcryptAdapter } from "../../../../shared/infra/cryptography/Bcrypt"
import { UsersRepository } from "../../repositories/MemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"


const makeSut = () => {
    const userRepository = new UsersRepository()
    const passwordHasher = new BcryptAdapter(8)
    const sut = new CreateUserUseCase(passwordHasher, userRepository)
    return {
        passwordHasher,
        sut
    }
}

let mockUser = {
    email: 'any_mail@mail.com',
    password: 'any_pass',
    name: 'any name'
}

describe('Create User Use Case', () => {
    it('should be able create user',  async () => {
        const { sut } = makeSut()
        const result = await sut.perform(mockUser)
        expect(result).toHaveProperty('id')
    })

    it('should not be able create user with same email', async () => {
        const { sut } = makeSut()
        await sut.perform(mockUser)
        await expect(sut.perform(mockUser)).rejects.toEqual(new BaseError('User already exists.', 401))
    })

    it('should be able create user and passwordHasher was called with success', async () => {
        const { sut, passwordHasher } = makeSut()
        const passwordHasherSpy = jest.spyOn(passwordHasher, 'hash')
        await sut.perform(mockUser)
        expect(passwordHasherSpy).toHaveBeenCalledWith(mockUser.password)
        expect(passwordHasherSpy).toHaveBeenCalledTimes(1)
    })
})