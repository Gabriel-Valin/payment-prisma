import { BaseError } from "../../../../shared/BaseError";
import { User } from "../../entities/User";
import { Cryptography } from "../../types/hasher/Cryptography";
import { ContractUsersRepository } from "../../types/repositories/UsersRepository";
import { TypeUser } from "../../types/requests/CreateUser";

export class CreateUserUseCase {
    constructor (
        private readonly passwordHasher: Cryptography,
        private readonly userRepository: ContractUsersRepository
    ) {}

    public async perform ({ email, password, name }: TypeUser): Promise<User> {
        const userAlreadyExists = await this.userRepository.findUserByEmail(email)
        if (!!userAlreadyExists) {
           throw new BaseError('User already exists.', 401)
        }
        const passwordHash = await this.passwordHasher.hash(password)
        const user = await this.userRepository.createUser({ email, password: passwordHash, name })
        return user
    }
}