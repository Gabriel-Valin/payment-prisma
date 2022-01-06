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
    it('should be able create user', () => {
        const { sut } = makeSut()
        const result = sut.perform(mockUser)
        expect(result).toHaveProperty('id')
    })
})