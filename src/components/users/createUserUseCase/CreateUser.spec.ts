type TypeUser = {
    id?: string
    email: string
    name: string
    password: string
}

interface ContractUserRepository {
    createUser (data: User): User
}

class User {
    id?: string
    email: string
    password: string
    name: string
}

class UsersRepository implements ContractUserRepository {
    private users: User[] = []

    public createUser({ email, password, name }: TypeUser): User {
        const user = new User()
        const dataUser = Object.assign(user, { id: 'uuid', email, password, name })
        this.users.push(dataUser)
        return dataUser
    }
}

class CreateUserUseCase {
    constructor(private readonly userRepository: ContractUserRepository) {}

    public perform ({ email, password, name }: TypeUser): User {
        const user = this.userRepository.createUser({ email, password, name })
        return user
    }
}

const makeSut = () => {
    const userRepository = new UsersRepository()
    const sut = new CreateUserUseCase(userRepository)
    return {
        sut
    }
}

describe('Authentication Use Case', () => {
    it('should be able auth user with correct credentials', () => {
        const { sut } = makeSut()
        const result = sut.perform({ email: 'anymail@mail.com', password: 'any_pass', name: 'any name' })
        expect(result).toHaveProperty('id')
    })
})