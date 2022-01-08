import { inject, injectable } from "tsyringe";
import { BaseError } from "../../../shared/BaseError";
import { User } from "../entities/User";
import { ContractUsersRepository } from "../types/repositories/UsersRepository";
import { TypeUser } from "../types/requests/CreateUser";

export class CreateUserUseCase {
    constructor (
        private readonly userRepository: ContractUsersRepository
    ) {}

    public async perform ({ email, password, name }: TypeUser): Promise<User> {
        const userAlreadyExists = await this.userRepository.findUserByEmail(email)
        if (!!userAlreadyExists) {
           throw new BaseError('User already exists.')
        }
        const user = await this.userRepository.createUser({ email, password, name })
        return user
    }
}