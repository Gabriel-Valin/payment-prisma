import { Response, Request } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body
        const useCaseContainer = container.resolve(AuthenticateUserUseCase)
        const useCasePerformance = await useCaseContainer.perform({ email, password })
        return response.status(201).json(useCasePerformance)
    } 
}