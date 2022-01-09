import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
export class CreateUserController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { email, password, name } = request.body
        const useCaseContainer = container.resolve(CreateUserUseCase)
        const useCasePerformance = await useCaseContainer.perform({ email, password, name })
        return response.status(201).json(useCasePerformance)
    } 
}

// await this.createUserUseCase.perform({ email, password, name })