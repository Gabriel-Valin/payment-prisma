import { User } from "../entities/User";
import { ContractUsersRepository } from "../types/repositories/UsersRepository";
import { TypeUser } from "../types/requests/CreateUser";

export class CreateUserUseCase {
    constructor (private readonly userRepository: ContractUsersRepository) {}

    public perform ({ email, password, name }: TypeUser): User {
        const user = this.userRepository.createUser({ email, password, name })
        return user
    }
}