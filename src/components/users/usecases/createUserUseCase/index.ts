import { BcryptAdapter } from "../../../../shared/infra/cryptography/Bcrypt";
import { PrismaRepository } from "../../repositories/PrismaRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export const makeCreateUserController = (): CreateUserController => {
    const userRepository = new PrismaRepository()
    const passwordHasher = new BcryptAdapter(8)
    const createUserUsecase = new CreateUserUseCase(passwordHasher, userRepository)
    return new CreateUserController(createUserUsecase)
}