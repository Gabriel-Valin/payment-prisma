import { BaseError } from "../../../../shared/BaseError"
import { BcryptAdapter } from "../../../../shared/infra/cryptography/Bcrypt"
import { UsersRepository } from "../../repositories/MemoryUsersRepository"
import { UsersTokenRecoveryRepository } from "../../repositories/MemoryUsersTokenRecoveryRepository"
import { Cryptography } from "../../types/hasher/Cryptography"
import { ContractUsersRepository } from "../../types/repositories/UsersRepository"
import { ContractUsersTokenRecoveryRepository } from "../../types/repositories/UsersTokenRepository"
import { RecoveryPasswordUseCase } from "./RecoveryPasswordUseCase"

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

    it('should not be able change password with invalid token', async () => {
        await expect(sut.perform({ token: 'invalid_token', password: 'any_pass' })).rejects.toBeInstanceOf(BaseError)
    })
})