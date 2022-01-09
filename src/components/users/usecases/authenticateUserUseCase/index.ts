import { BcryptAdapter } from "../../../../shared/infra/cryptography/Bcrypt";
import { JwtAdapter } from "../../../../shared/infra/cryptography/Jwt";
import { PrismaRepository } from "../../repositories/PrismaRepository";
import { AuthenticateUserController } from "././AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export const makeAuthenticateUserController = (): AuthenticateUserController => {
    const userRepository = new PrismaRepository()
    const passwordHasher = new BcryptAdapter(8)
    const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, jwtAdapter, passwordHasher)
    return new AuthenticateUserController(authenticateUserUseCase)
}