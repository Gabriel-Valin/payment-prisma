import { UsersRepository } from "../repositories/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export const factoryCreateUser = () => {
    const userRepository = new UsersRepository()
    const createUserUsecase = new CreateUserUseCase(userRepository)
    return new CreateUserController(createUserUsecase)
}
