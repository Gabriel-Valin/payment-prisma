import { BaseError } from "../../../../shared/BaseError"
import { Cryptography } from "../../types/hasher/Cryptography"
import { TokenizationAdapter } from "../../types/hasher/Jwt"
import { ContractUsersRepository } from "../../types/repositories/UsersRepository"
import { TypeUser } from "../../types/requests/CreateUser"
import { UserAuthenticated } from "../../types/requests/UserAuthenticate"

export class AuthenticateUserUseCase {
    constructor (
        private readonly userRepository: ContractUsersRepository,
        private readonly jwtAdapter: TokenizationAdapter,
        private readonly passwordHasher: Cryptography
    ) {}

    public async perform ({ email, password }: TypeUser): Promise<UserAuthenticated> {
        const userAlreadyExists = await this.userRepository.getUserInfoByEmail(email)

        if (!userAlreadyExists) {
            throw new BaseError('Email or password invalid', 401)
        }

        const passwordCompare = await this.passwordHasher.compare(password, userAlreadyExists.password)
        
        if (!passwordCompare) {
            throw new BaseError('Password or email is invalid', 401)
        }

        const token = this.jwtAdapter.encrypt(userAlreadyExists.id)

        const userAuthenticated = {
            token,
            user: {
                ...userAlreadyExists, 
            }
        }

        return userAuthenticated
    }
}