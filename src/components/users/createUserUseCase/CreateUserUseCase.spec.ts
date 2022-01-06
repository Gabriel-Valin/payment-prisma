import { BaseError } from "../../../shared/BaseError"
import { UsersRepository } from "../repositories/UserRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"

const makeSut = () => {
    const userRepository = new UsersRepository()
    const sut = new CreateUserUseCase(userRepository)
    return {
        sut
    }
}

const mockUser = {
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
        await expect(sut.perform(mockUser)).rejects.toEqual(new BaseError('User already exists.'))
    })
})