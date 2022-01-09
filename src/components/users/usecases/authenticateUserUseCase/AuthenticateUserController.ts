import { Response, Request } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    constructor (private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}
    public async execute (request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body
        const useCasePerformance = await this.authenticateUserUseCase.perform({ email, password })
        return response.status(201).json(useCasePerformance)
    } 
}