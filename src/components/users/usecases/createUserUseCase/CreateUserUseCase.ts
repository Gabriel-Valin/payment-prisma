import { inject, injectable } from "tsyringe";
import { BaseError } from "../../../../shared/BaseError";
import { User } from "../../entities/User";
import { Cryptography } from "../../types/hasher/Cryptography";
import { ContractUsersRepository } from "../../types/repositories/UsersRepository";
import { TypeUser } from "../../types/requests/CreateUser";

@injectable()
export class CreateUserUseCase {
    constructor (
        @inject('BcryptAdapter')
        private readonly passwordHasher: Cryptography,
        @inject('PrismaClient')
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