import { inject } from "tsyringe"
import { BaseError } from "../../../../shared/BaseError"
import { Cryptography } from "../../types/hasher/Cryptography"
import { ContractUsersRepository } from "../../types/repositories/UsersRepository"
import { ContractUsersTokenRecoveryRepository } from "../../types/repositories/UsersTokenRepository"

export class RecoveryPasswordUseCase {
    constructor (
        @inject('UsersTokenRecoveryPrisma')
        private readonly usersTokenRecoveryPasswordRepository: ContractUsersTokenRecoveryRepository,
        @inject('PrismaClient')
        private readonly usersRepository: ContractUsersRepository,
        @inject('BcryptAdapter')
        private readonly bcryptAdapter: Cryptography
    ) {}
    public async perform ({ token, password }): Promise<any> {
        const userTokenIsValid = await this.usersTokenRecoveryPasswordRepository.findByToken(token)
        
        if (!userTokenIsValid) {
            throw new BaseError('Invalid token', 403)
        }
        
        const userFound = await this.usersRepository.findUserByid(userTokenIsValid.userId)
       
        userFound.password = await this.bcryptAdapter.hash(password)
        const userWithNewPass = await this.usersRepository.createUser(userFound)
        return userWithNewPass
    }
}