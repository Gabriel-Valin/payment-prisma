import { BcryptAdapter } from "../../../../shared/infra/cryptography/Bcrypt"
import { UsersRepository } from "../../repositories/MemoryUsersRepository"
import { Cryptography } from "../../types/hasher/Cryptography"
import { ContractUsersRepository } from "../../types/repositories/UsersRepository"

export type TypeUserTokenRecovery = {
    token: string
    userId: string
    expirenIn: number
}

export interface ContractUsersTokenRecoveryRepository {
    createTokenRecovery ({ token, expirenIn, userId }: TypeUserTokenRecovery): Promise<UsersTokenRecovery>
    findByToken (token: string): Promise<UsersTokenRecovery>
}

export class UsersTokenRecovery {
    id?: string
    token: string
    userId: string
    expirenIn: number
}

export class UsersTokenRecoveryRepository implements ContractUsersTokenRecoveryRepository {
    private usersToken: UsersTokenRecovery[] = []
    public async createTokenRecovery({ token, expirenIn, userId }: TypeUserTokenRecovery): Promise<UsersTokenRecovery> {
        const userToken = new UsersTokenRecovery()
        const createUserToken = Object.assign(userToken, { id: 'uuid', token, expirenIn, userId })
        this.usersToken.push(createUserToken)
        return createUserToken
    }

    public async findByToken(token: string ): Promise<UsersTokenRecovery> {
        const tokenFound = this.usersToken.find(userToken => userToken.token === token)
        return tokenFound
    }
    
}

export class RecoveryPasswordUseCase {
    constructor (
        private readonly usersTokenRecoveryPasswordRepository: ContractUsersTokenRecoveryRepository,
        private readonly usersRepository: ContractUsersRepository,
        private readonly bcryptAdapter: Cryptography
    ) {}
    public async perform ({ token, password }): Promise<any> {
        const userTokenIsValid = await this.usersTokenRecoveryPasswordRepository.findByToken(token)
        const userFound = await this.usersRepository.findUserByid(userTokenIsValid.userId)

        userFound.password = await this.bcryptAdapter.hash(password)
        const userWithNewPass = await this.usersRepository.createUser(userFound)
        return userWithNewPass
    }
}


let userRepository: ContractUsersRepository
let tokensRecoveryRepository: ContractUsersTokenRecoveryRepository
let bcryptAdapter: Cryptography
let sut: RecoveryPasswordUseCase

describe('Recovery Password Use Case', () => {
    beforeEach(() => {
        tokensRecoveryRepository = new UsersTokenRecoveryRepository()
        userRepository = new UsersRepository()
        bcryptAdapter = new BcryptAdapter(8)
        sut = new RecoveryPasswordUseCase(tokensRecoveryRepository, userRepository, bcryptAdapter)
    })
    it('should be able able change password', async () => {
        const user = await userRepository.createUser({ email: 'any_mail@mail.com', name: 'any_name', password: 'any_pass' })
        const userToken = await tokensRecoveryRepository.createTokenRecovery({ token: 'any_token', expirenIn: 15*60*60, userId: user.id })
        const result = await sut.perform({ token: userToken.token, password: 'any_pass' })
        expect(result).toHaveProperty('id')
        expect(typeof result.password).toBe('string')
        const hashToCompare = await bcryptAdapter.compare('any_pass', user.password)
        expect(hashToCompare).toBeTruthy()
    })
})