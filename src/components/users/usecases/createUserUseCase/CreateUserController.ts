import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor (private readonly createUserUseCase: CreateUserUseCase) {}
    public async execute (request: Request, response: Response): Promise<Response> {
        const { email, password, name } = request.body
        const useCasePerformance = await this.createUserUseCase.perform({ email, password, name })
        return response.status(201).json(useCasePerformance)
    } 
}